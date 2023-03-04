const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const { token } = req.cookies;
    // console.log(token)
    // if not token
    if(!token){
       return  next(new ErrorHandler("Please Login For Access These Function",401));
    }

    // if token 
    // decode token 
    const decodedData = jwt.verify(token , process.env.JWT_SECRET);
    // get id from decoded token
    req.user = await User.findById(decodedData.id);
     next();
})

// role authentiction
exports.authorizeRoles = (...roles)=>{  // 3 dot ke baad likha hai tho abb ye array ban gaya
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
            // error 403 ka matlab hai server smj gya hai tum kya karna chate ho per tum acces nhi kar sakte uss perticule chiz ko
        }
        next();
    }
}