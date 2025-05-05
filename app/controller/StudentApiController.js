const ErrorCode = require("../helper/httpsServerCode");
const StudentModel=require('../model/student')


class StudentApiController{

    //create student

    async createStudent(req,res){
        try{
            //console.log(req.body);
            const{name,email,phone,city}=req.body
            console.log('name',req.body.name);
            
            const sdata=new StudentModel({
                name,email,phone,city
            })
            if(!name||!email||!phone||!city){
                return res.status(ErrorCode.Badreq).json({
                    status:false,
                    message:"All field required",
                    
                })  
            }
            else if(name.length>20||name.length<5)
            {
                return res.status(ErrorCode.Badreq).json({
                    status:false,
                    message:"name must be contain 5 charecters",
                    
                })  

            }
            else if( phone.length<10||phone.length>10)
            
                {
                    return res.status(ErrorCode.Badreq).json({
                        status:false,
                        message:"phone number must be 10 digits",
                        
                    })  
    
                }
           
            const data=await sdata.save()

            return res.status(ErrorCode.Create).json({
                status:true,
                message:"student create successfully",
                data:data
            })
            
        }
        catch (error) {
            console.error(error); // Add this to inspect the full error
        
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                return res.status(ErrorCode.InternalServerError).json({
                    status: false,
                    message: "Email is already available"
                });
            }
        
            // Default fallback error handler
            return res.status(ErrorCode.InternalServerError).json({
                status: false,
                message: "Something went wrong",
                error: error.message
            });
        }
    }
   

    //get all student
    async Studentlist(req,res){
        try{
            //console.log(req.body);
           const student=await StudentModel.find()

            return res.status(ErrorCode.Success).json({
                status:true,
                message:"get all student successfully",
                total:student.length,
                data:student
            })
            
        }catch(error){
            return res.status(ErrorCode.InternalServerError).json({
                status:false,
                message:error.message
            })
        }
    }

    //for get single data
    async editStudent(req,res){
        try{
            const id=req.params.id

           const edit=await StudentModel.findById(id)

            return res.status(ErrorCode.Success).json({
                status:true,
                message:"get single data",
                data:edit
            })
            
        }catch(error){
            return res.status(ErrorCode.InternalServerError).json({
                status:false,
                message:error.message
            })
        }
    }

  
 
//for update
async UpdateStudent(req, res) {
    try {
      const id = req.params.id;
  
      const updatedStudent = await StudentModel.findByIdAndUpdate(id, req.body, {
        new: true // This ensures you get the updated document
      });
  
      return res.status(ErrorCode.Create).json({
        status: true,
        message: "Student updated successfully",
        data: updatedStudent // Now this will show the updated data
      });
  
    } catch (error) {
      return res.status(ErrorCode.InternalServerError).json({
        status: false,
        message: error.message
      });
    }
  }
  
  

//for delete
    async deleteStudent(req,res){
        try{
            const id=req.params.id
            
           await StudentModel.findByIdAndDelete(id)

            return res.status(ErrorCode.Create).json({
                status:true,
                message:"Student delete successfully",
            
            })
            
        }catch(error){
            return res.status(ErrorCode.InternalServerError).json({
                status:false,
                message:error.message
            })
        }
    }
}


module.exports=new StudentApiController()


