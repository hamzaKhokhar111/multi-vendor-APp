const express=require("express");
// const ErrorHandler = require("./utills/ErrorHandler");
const app=express();
const cookiesParser=require("cookie-parser")
const bodyParser=require("body-parser")
const cors=require("cors");
const  user =require("./controller/user")


app.use(express.json());
app.use(cors());
app.use(cookiesParser());
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"back/config/.env"
    })
}  


// app.get('/home',(req,resp)=>{
//     resp.send('Hamza Ashraf KHokhar')
// })

app.use("/api/v2/user",user);


// app.use(ErrorHandler);





module.exports=app;