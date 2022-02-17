const express=require("express")
const router=require("./routes/route")

const cookie=require("cookie-parser")

const app=express()

app.use(cookie())
app.use(express.json());

app.use("/",router)

app.listen(5000,()=>{
    console.log("port is runing");
})