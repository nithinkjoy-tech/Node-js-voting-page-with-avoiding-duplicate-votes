const express = require("express")
const app=express()
const cookieParser = require("cookie-parser")
const index=require("./routes/index")
const voter=require("./routes/votes")
const expressLayouts=require("express-ejs-layouts")
const mongoose=require("mongoose")
const db=require("./config/keys").MongoURI


mongoose.connect(db,{useNewUrlParser:true})
        .then(console.log("connected to database"))
        .catch(err=>console.log(err))


app.use(cookieParser("big_secret"))
app.use(expressLayouts)
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use("/",index)
app.use("/voter",voter)

const port=process.env.PORT||3000
app.listen(port, () => console.log(`Listening to port ${port}`))