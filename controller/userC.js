const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.register = catchAsyncErrors(async (req,res,next)=>{
     const {name,email,password} = req.body;
     
    const user = await User.create({
        name,email,password
        
    });

     sendToken(user,201,res);
    // res.send('Working Fine')

})

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{

    const {email,password} = req.body;

    //Check  if user has given email and password both
    if(!email || !password){
        return next(new ErrorHandler('Please enter Email and Password',400));
    }
    const  user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }
    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched ){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }
    sendToken(user,200,res);

});

exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const  user = await User.findById(req.user.id);
    res.status(200).json({
      success:true,
      user,
    });
})


