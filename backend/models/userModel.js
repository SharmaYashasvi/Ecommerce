const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
      name:{
        type:String,
        required:[true,"Please Enter The Name"],
        maxLength:[30,"Name Should Be Less Then 30"],
        minLength:[4,"Name Should Be Greater Than 4 Char"]
      },
      email:{
        type:String,
        required:[true,"Please Enter The Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter A Valid Email"]
      },
      password:{
        type:String,
        required:[true,"Please Enter The Password"],
        minLenght:[8,"Pass Should Be Greater Than 8 char"],
        select:false
      },
      avatar:{
            public_id:{
               type:String,
               required:true
            },
            url:{
              type:String,
              required:true
           }
      },
      role:{
         type:String,
         default:"user"
      },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

module.exports = mongoose.model("User",userSchema);