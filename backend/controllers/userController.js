const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

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

       const token = user.getJWTToken();

       res.status(201).json({
        succes:true,
        token,
       });
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
        const token = user.getJWTToken();

       res.status(201).json({
        succes:true,
        token,
       });

})