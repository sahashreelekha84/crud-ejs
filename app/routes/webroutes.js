const express=require('express')
const HomeController = require('../controller/HomeController')
const StudentImageupload = require('../helper/studentimageupload')

const router=express.Router()




router.get('/',HomeController. list)
router.get('/add',HomeController.addPage)
router.post('/create',StudentImageupload.single('image'),HomeController.createstudent)

router.get('/edit/:id',HomeController.edit)
router.post('/update/:id',HomeController.update)
router.get('/delete/:id',HomeController.delete)





module.exports=router