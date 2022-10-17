const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const axios = require('axios')
exports.jokes = catchAsyncErrors(async (req,res,next)=>{
   
    // res.send('Working Fine')
    const ff = await  axios.get('https://api.chucknorris.io/jokes/random',{
            headers:{
                'Content-Type':'application/json'
            }
    })
   
    const rr = await ff.data.value;
   
    res.status(200).send(rr)
})
