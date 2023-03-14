const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary"); // for uploading photo
// register a user

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

       const {name,email,password} = req.body;
       const user = await User.create({
        name,email,password,
        avatar:{
            public_id: myCloud.public_id,
                  url: myCloud.secure_url,
        }
       });

      sendToken(user,201,res);
});

// login user function
exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
        const {email ,password} = req.body;

        // checking both email or pass filled by the user or not
        if(!email || !password){
            return next(new ErrorHandler("Please Enter The Email & Password",400));
        }
        
        // finding in database
        const user = await User.findOne({email:email}).select("+password");
        
        // if user not found
        if(!user){
            return next(new ErrorHandler("Invalid Email Or Password",401));
        }

        // compare the password
        const isPasswordMatched = await user.comparePassword(password);

        // if pass not matched
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid Email Or Password",401));
        }

        // if Matched
    //     const token = user.getJWTToken();

    //    res.status(201).json({
    //     succes:true,
    //     token,
    //    });

    // code reduction because we made function in utils
    sendToken(user,200,res);

});

// Logout function
exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{
    
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })


    res.status(201).json({
        success:true,
        message:"Logged Out"
    })
})

// forget password
exports.forgetPassword = catchAsyncErrors(async(req,res,next)=>{
       const user = await User.findOne({email:req.body.email});
       // if user not found
       if(!user){
           return next(new ErrorHandler("User Not Found",404));
       } 
       // when it found call method to genrate token
       const resetToken =  user.getResetPasswordToken();
       // now this will fill to new entitiy in user schema named resetPasswordToken & resetPasswordExpire now time to save it
       await user.save({validateBeforeSave:false});
       // genrate a link 
       // slight updation when we deploy it on live server
       const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}` ;  // req.protocol}://${req.get("host") , /api/v1
      // message for user
      const message = `Your Password Reset Token Is :- \n\n ${resetPasswordUrl} \n if you are not requested it then please ignore it`;

      // try catch 
      try {

        // function call for send email
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message
        })
        
        res.status(200).json({
            success:true,
            message:`Email Sent to ${user.email} successfully`
        })
        
      } catch (error) {
         // tho jo do naye field bana lie hai unko undined karna hoga 
         this.resetPasswordToken = undefined;
         this.resetPasswordExpire = undefined;
         // save these changes
         await user.save({validateBeforeSave:false});
         return next(new ErrorHandler(error.message,500));
      }
})

// reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    // we hashed the token we get in req
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    // find the user by matching resetPasswordToken
    const user = await  User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()},
    })

    // if user nhi mila
    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid Or has been Expired",400));
    } 

    // passwords are unmatched
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not matched with confirm password",400));
    }

    // update the password
    user.password = req.body.password;
    // upadte the resetPasswordExpire resetPasswordToken kyoki abb inki jarurat nhi hai
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    // save 
    await user.save();
    // kyoki pass badla hai tho login bhi kar hi denge
     sendToken(user,200,res);
});

// get User Detaits
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
      const user = await  User.findById(req.user.id); // we pick id from req.user where we save entire user after authentication
      res.status(200).json({
        success:true,
        user
      })
});

// update user password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    // passsword ko select false kar rakha tha hamne schema mai tho usko select karne ke lie 
    const user = await User.findById(req.user.id).select("+password");

    // compare the oldpassword
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    // if pass not matched
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid old Password",400));
    }
   
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not matched",400));
    }

    user.password = req.body.newPassword; // upadte password
    await user.save(); // save the user
    sendToken(user,200,res); // instant login
});


// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      user
    });
  });

// get all users detail when admin call
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users,
    });
});

// get single user detail when admin call
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`user does not exists with id : - ${req.params.id}`,404));
    }
    res.status(200).json({
        success:true,
        user,
    });
});
 

// update user role --admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUser = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id,newUser,{
      new:true,
      runValidators:true,
      useFindAndModify:false
    });

    if(!user){
        return next(new ErrorHandler(`user does not exists with id : - ${req.params.id}`,404));
    }

    res.status(200).json({
      success:true
    })
})


// delete  user  --admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`user does not exists with id : - ${req.params.id}`,404));
    }

    await user.remove();
    res.status(200).json({
      success:true,
      message:"user deleted successfully"
    })
})