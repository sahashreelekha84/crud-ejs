
const ErrorCode = require("../helper/httpsServerCode");
const StudentModel=require('../model/student')
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
class StudentApiController{

    //create student

    async createStudent(req,res){
        console.log(req.file);
        
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
                if(req.file){
                    sdata.image=req.file.path
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

        // Find and update the student
        const updatedStudent = await StudentModel.findByIdAndUpdate(id, req.body, {
            new: true 
        });

        if (!updatedStudent) {
            return res.status(404).json({
                status: false,
                message: "Student not found",
            });
        }

       
        if (req.file) {
            
            const newImagePath =req.file.path;  

            updatedStudent.image = newImagePath;

            
            await updatedStudent.save();

            console.log("New image uploaded and saved:", newImagePath);
            
        }

        return res.status(200).json({
            status: true,
            message: "Student updated successfully",
            data: updatedStudent // Return the updated student data
        });

    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

  
  



   



    async deleteStudent(req, res) {
    const id = req.params.id;

    try {
        const deletedStudent = await StudentModel.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({
                status: false,
                message: "Student not found",
            });
        }

        if (deletedStudent.image) {
         
            const absolutePath = path.join(__dirname, '..','..',deletedStudent.image);
            console.log("Attempting to delete:", absolutePath);

            if (fsSync.existsSync(absolutePath)) {
                await fs.unlink(absolutePath);
                console.log(absolutePath);
                
                console.log("File deleted:", absolutePath);
            } else {
                console.log("File not found:", absolutePath);
            }
        }

        return res.status(200).json({
            status: true,
            message: "Student deleted successfully",
        });

    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

}


module.exports=new StudentApiController()


