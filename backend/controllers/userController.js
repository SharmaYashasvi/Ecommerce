const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
// register a user

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
       const {name,email,password} = req.body;
       const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is fake id",
            url:"profileurl"
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
       const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}` ;
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
})