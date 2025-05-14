const ErrorCode = require("../helper/httpsServerCode");
const StudentModel = require('../model/student')
const fs = require('fs').promises;
class HomeController {

    async addPage(req, res) {
        try {
            res.render('add', {
                title: "home page",
            })

        } catch (error) {
            console.log(error);


        }

    }



    async list(req, res) {
        try {
            const data = await StudentModel.find({ isDeleted: false })
            res.render('list', {
                title: "list page",
                data: data
            })

        } catch (error) {
            console.log(error);


        }

    }
    async createstudent(req, res) {
        try {
            //console.log(req.body);
            const { name, email, phone, city } = req.body


            const sdata = new StudentModel({
                name, email, phone, city
            })
            if (req.file) {
                sdata.image = req.file.path
            }
            const data = await sdata.save()
            if (data) {
                res.redirect('/')
            } else {
                res.redirect('/add')
            }
        } catch (error) {
            console.log(error);


        }


    }

    async edit(req, res) {
        try {
            const id = req.params.id
            const editdata = await StudentModel.findById(id)
            res.render('edit', {
                title: "edit page",
                data: editdata
            })

        } catch (error) {
            console.log(error);


        }

    }
    async update(req, res) {
        console.log(req.body);

        try {
            const id = req.params.id

            const updatedata = await StudentModel.findByIdAndUpdate(id,
                req.body
            )
            res.redirect('/')


        } catch (error) {
            console.log(error);

        }

    }

    async delete(req, res) {
        console.log(req.body);

        try {
            const id = req.params.id

            const updatedata = await StudentModel.findByIdAndUpdate(id, { isDeleted: true })


            res.redirect('/')


        } catch (error) {
            console.log(error);
            console.error('Error deleting file:', err);
        }

    }

}


module.exports = new HomeController()


