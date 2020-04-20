const mongoose=require("mongoose")

const vote=new mongoose.Schema({
    dog:{
        type:Number,
        required:true
    },
    deer:{
         type:Number,
         required:true
    },
    tiger:{
          type:Number,
         required:true
    },
    lion:{
        type:Number,
        required:true
    }

})

const Vote=mongoose.model("votes",vote)

module.exports=Vote

