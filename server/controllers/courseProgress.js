const CourseProgress = require("../models/CourseProgress");
const SubSection=require("../models/SubSection")
// updateCourseProgress

exports.updateCourseProgress=async(req,res)=>{
    const {courseId,subSectionId}=req.body;
    const userId=req.user.id;
    try{
        const subSection=await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                error:"Invalid SubSection!!!!",
            })
        }
        let courseProgress=await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        });
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress doest not exist!!",
            })
        }
        else{
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error:"SubSection already completed",
                });
            }
            courseProgress.completedVideos.push(subSectionId);
        }
        await courseProgress.save();
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            error:"Internal Server Error"
        })
    }
}