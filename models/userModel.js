const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
// const  JWT_SECRET = "DFDFGFHYJYJHKGTHYJUKUKZCDFEGTHGBSFGFDGRGBDCFDFASDEREEGF"
// const  JWT_EXPIRE="5d"
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name"],
    maxLength: [30, "Name cannot be more than 30 characters"],
    minLength: [4, "Name  should be more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: true,
    validator: [validator.email, "Please enter valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minLength: [8, "Password  should be more than  8 characters"],
    select: false,
  },


});

//Hashing password
userSchema.pre("save",async function(next){

    if(!this.isModified('password')){
       next();
    }
    this.password = await bcrypt.hash(this.password,10);

});

//JWT Token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}



module.exports= mongoose.model('User',userSchema);