const ErrorHandler = require("../utils/errorhandler");
module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    // wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resource Not Found : ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // duplicate hone se error jo aaye uski handling
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    // jsonwebtoken galat daal dia
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token Error Invalid Try Again`;
        err = new ErrorHandler(message,400);
    }

    // jsonwebtoken expire
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token Expired`;
        err = new ErrorHandler(message,400);
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}