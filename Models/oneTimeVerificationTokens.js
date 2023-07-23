const mongoose=require('mongoose');

const oTVSchema =new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    tokenString:{type:String, required:true,unique:true},
    isUsed:{type:Boolean,require:true}
})

const OTVForEmail=mongoose.model('OTVForEmail',oTVSchema) 

module.exports={OTVForEmail}