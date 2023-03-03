const mongoose = require("mongoose");
const validator = require("validator");

// for incryption of password
const bcrypt = require("bcryptjs");

// for jwt token
const jwt = require("jsonwebtoken");

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
        minLength:[8,"Pass Should Be Greater Than 8 char"],
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

// pass encryption here before saving function will run
userSchema.pre("save",async function(next){  // we not use arrow ()=> function beacuse we not able to use this keyword in arrow fun. // so we use fuction() keyword
     // check if pass modifide or not if not modifide skip the hashing/bcryption
      if(!this.isModified("password")){
          next();
      }  
      // encryption using bcrypt library
      this.password =  await bcrypt.hash(this.password,10);                          
});

// JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
       expiresIn:process.env.JWT_EXPIRE,
    });
};

// for password compare 
userSchema.methods.comparePassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password); // by using compare method of bcrypt we compare enterpass & mainpass
}

module.exports = mongoose.model("User",userSchema);