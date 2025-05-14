const mongoose=require('mongoose')
const Schema=mongoose.Schema
// const { softDeletePlugin } = require('soft-delete-plugin-mongoose');


const StudentSchema=new Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    isDeleted: {
        type: Boolean,
        default: false
      },
},

{ timestamps: true })
// StudentSchema.plugin(softDeletePlugin);
const StudentModel=mongoose.model('student',StudentSchema)
module.exports=StudentModel