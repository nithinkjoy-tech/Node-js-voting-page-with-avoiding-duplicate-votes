
const express = require("express")
const cookieParser = require("cookie-parser")
const router = express.Router()
const app=express()
const Vote=require("../models/schema")


app.use(cookieParser("big_secret"))

const cookieConfig = {
    httpOnly: true,
    maxAge: 86400000,
    signed: true
};

router.post('/vote', async(req, res) => {
    const voteReciever=req.body.vote
    if(!voteReciever) return res.render("plzvote")
    const myTestCookie = req.signedCookies.nithin_vote
    if (myTestCookie) return res.render("alreadyvoted")
    res.cookie('nithin_vote', 'you_voted', cookieConfig);
    const result=await Vote.findById("5e9a900b5c30693ce8a96c6e")
    if(voteReciever=="dog") result.dog++
    if(voteReciever=="deer") result.deer++
    if(voteReciever=="tiger") result.tiger++
    if(voteReciever=="lion") result.lion++
    await result.save()

    console.log(req.body.vote)
    res.render("votesuccess")
});


router.get("/result",async(req,res)=>{
  const result=await Vote.findById("5e9a900b5c30693ce8a96c6e")
  const dog=result.dog
  const deer=result.deer
  const tiger=result.tiger
  const lion=result.lion

  a=[{name:"lion",value:lion},{name:"deer",value:deer},{name:"tiger",value:tiger},{name:"dog",value:dog}]
  const sorted=a.sort((a,b)=>(a.value>b.value)?-1:1)
  res.render("result",{title_one:sorted[0].name,
      title_two:sorted[1].name,
      title_three:sorted[2].name,
      title_four:sorted[3].name,
      value_one:sorted[0].value,
      value_two:sorted[1].value,
      value_three:sorted[2].value,
      value_four:sorted[3].value})
})


module.exports=router