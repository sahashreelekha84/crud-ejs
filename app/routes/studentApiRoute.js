const express=require('express')
const StudentApiController = require('../controller/StudentApiController')
const StudentImageupload = require('../helper/studentimageupload')

const router=express.Router()




router.post('/create/student',StudentImageupload.single('image'),StudentApiController.createStudent)
router.get('/student',StudentApiController.Studentlist)
router.get('/student/edit/:id',StudentApiController.editStudent)
router.post('/student/update/:id',StudentImageupload.single('image'),StudentApiController.UpdateStudent)
router.delete('/student/delete/:id',StudentApiController.deleteStudent)




module.exports=router