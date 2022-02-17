// const cookiesParser = require("cookie-parser")
// const express=require("express")
// const router = express.Router()
// const {verify}= require("jsonwebtoken")
// router.use(cookiesParser())


// authentication=(req,res,next)=>{
//     token=req.cookies;
//     console.log(token);
//     if (token==undefined){
//         res.send({succses:0,
//         message:"authentication error"})
//     }else{
//     verify(token.user,"subhashini",(err,tokendata)=>{
//         if(err){
//             res.send({message:"authentication  error"});
//             console.log(err)

//         }
//         else if(tokendata.customer_id==undefined){
//             res.send({message:"authentication error"})
//         }
//         else{
//             res.tokendata=tokendata
//             next()
//         }

//     })}

// }
// module.exports={authentication}

var jwt = require('jsonwebtoken')

authentication = (req, res, next) => {
    try {
        var token = req.cookies.user

        var decode = jwt.verify(token, 'subhashini')
        req.userData = decode

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: 'You are not logged '
        })
    }

}
module.exports={authentication}