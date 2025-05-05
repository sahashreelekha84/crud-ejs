const express=require('express')
const StudentApiController = require('../controller/StudentApiController')
const router=express.Router()




router.post('/create/student',StudentApiController.createStudent)
router.get('/student',StudentApiController.Studentlist)
router.get('/student/edit/:id',StudentApiController.editStudent)
router.post('/student/update/:id',StudentApiController.UpdateStudent)
router.delete('/student/delete/:id',StudentApiController.deleteStudent)




module.exports=router