import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operation/courseApi';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

function EditCourses(){
    const dispatch=useDispatch();
    const { courseId }=useParams();
    const { course }=useSelector((state)=>state.course);
    const [loading,setloading]=useState(false);
    const {token}=useSelector((state)=>state.auth);

    useEffect(()=>{
        const populateCourseDeatils=async()=>{
            setloading(true);
            const result=await getFullDetailsOfCourse(courseId,token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setloading(false);
        }
        populateCourseDeatils();
    },[]);

    if(loading){
        return (
            <div>
                Loading....
            </div>
        )
    }

  return (
    <div className='text-white'>
        <h1>Edit Courses</h1>
        <div>
            {
                course?(<RenderSteps/>):(<p>Course Not Found</p>)
            }
        </div>
    </div>
  )
}

export default EditCourses