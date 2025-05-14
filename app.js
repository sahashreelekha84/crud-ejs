const express=require('express')
const ejs=require('ejs')
const path=require('path')
const dbCon=require('./app/config/dbcon')
const dotenv=require('dotenv').config()
const cors=require('cors')
const app=express()
dbCon()

app.use(express.static(__dirname + '/public'));
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.set('view engine','ejs');
app.set('views','views')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const webroute=require('./app/routes/webroutes')
app.use(webroute)
const studentroutes=require('./app/routes/studentApiRoute')
app.use('/api',studentroutes)
const port=3005
app.listen(port,()=>{
    console.log(`server running port ${port}`);
    
})