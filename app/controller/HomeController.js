const ErrorCode = require("../helper/httpsServerCode");
const StudentModel=require('../model/student')
class HomeController{

    async  addPage(req,res){
        try{
            res.render('add',{
                title:"home page",
            })

        }catch(error){
            console.log(error);
            

        }

    }

   

    async  list(req,res){
        try{
            const data=await StudentModel.find()
            res.render('list',{
                title:"list page",
                data:data
            })

        }catch(error){
            console.log(error);
            

        }

    }
    async  createstudent(req,res){
        try{
           //console.log(req.body);
           const{name,email,phone,city}=req.body  

          
                  const sdata=new StudentModel({
                       name,email,phone,city
                    }) 
                   const data= await sdata.save()
                   if(data){
                    res.redirect('/')
                   }else{
                    res.redirect('/add')
                   }
        }catch(error){
            console.log(error);
            

        }
        

    }

    async  edit(req,res){
        try{
            const id=req.params.id
            const editdata=await StudentModel.findById(id)
            res.render('edit',{
                title:"edit page",
                data:editdata
            })

        }catch(error){
            console.log(error);
            

        }

    }
    async  update(req,res){
        console.log(req.body);
        
        try{
            const id=req.params.id
           
            const updatedata=await StudentModel.findByIdAndUpdate(id,
                req.body
            )
          res.redirect('/')
         
        
        }catch(error){
            console.log(error);

        }

    }
    async  delete(req,res){
        console.log(req.body);
        
        try{
            const id=req.params.id
           
            const updatedata=await StudentModel.findByIdAndDelete(id)

          res.redirect('/')
         
        
        }catch(error){
            console.log(error);

        }

    }
    
}


module.exports=new HomeController()