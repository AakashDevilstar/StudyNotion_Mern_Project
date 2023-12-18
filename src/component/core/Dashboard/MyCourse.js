import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operation/courseApi';
import IconBtn from '../../Common/IconBtn';
import CourseTable from './InstructorCourse/CourseTable';

function MyCourse() {
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const [courses,setcourses]=useState([]);

    useEffect(()=>{
        const fetchCourse=async()=>{
            const result=await fetchInstructorCourses(token);
            if(result){
                setcourses(result);
            }
        }
        fetchCourse();
    },[]);

    return (
      <div className='text-white'>
        <div className='flex justify-between'>
            <h1>My Courses</h1>
            <IconBtn
              text="Add Course"
              onclick={()=>navigate("/dashboard/add-course")}
            />
        </div>
        {courses && <CourseTable courses={courses} setcourses={setcourses}/>}
      </div>
    )
}

export default MyCourse
