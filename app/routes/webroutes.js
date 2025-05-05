const express=require('express')
const HomeController = require('../controller/HomeController')

const router=express.Router()




router.get('/',HomeController. list)
router.get('/add',HomeController.addPage)
router.post('/create',HomeController.createstudent)

router.get('/edit/:id',HomeController.edit)
router.post('/update/:id',HomeController.update)
router.get('/delete/:id',HomeController.delete)





module.exports=router