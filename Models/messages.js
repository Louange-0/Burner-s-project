const mongoose=require('mongoose');

const messageSchema= new mongoose.Schema({
    from:{type:String, required:true},
    to:{type:String,default:"Company"},
    content: { type: String, required: true },
    replyId:{type:String,default:"no reply"},
    timeStamp:{type:Date, required:true,default:new Date},
})

const Message=mongoose.model('Message',messageSchema);

module.exports ={Message}