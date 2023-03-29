//import mongoose
const mongoose= require("mongoose")

//connection string
mongoose.connect("mongodb://localhost:27017/bankServer",{useNewUrlParser:true})

//model
const User=mongoose.model("User",{
usename:String,
acno:Number,
password:String,
balance:Number,
transactions:[]
})

module.exports={
    User
}