import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table,Tbody,Td,Th,Thead, Tr } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constant';
import ConfirmationModal from '../../../Common/ConfirmationModal';
import { deleteCourse } from '../../../../services/operation/courseApi';
import { fetchInstructorCourses } from '../../../../services/operation/courseApi';
import { setCourse } from '../../../../slices/courseSlice';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';

function CourseTable({courses,setcourses}){
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const [loading,setloading]=useState(false);
    const [confirmationModal,setconfirmationModal]=useState(null);
    const navigate=useNavigate();
    const handleCourseDelete=async(courseId)=>{
        setloading(true);
        await deleteCourse({courseId:courseId},token);
        const result=await fetchInstructorCourses(token);
        if(result){
            setcourses(result);  
        }
        setconfirmationModal(null);
        setloading(false);
    }

  return (
    <div>
        <Table>
            <Thead>
                <Tr className="flex gap-x-10 border-richblack-800 p-8">
                    <Th>
                        Courses
                    </Th>
                    <Th>
                        Duration
                    </Th>
                    <Th>
                        Price
                    </Th>
                    <Th>
                        Actions
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    courses.length === 0?(
                        <Tr>
                            <Td>
                                No Courses Found
                            </Td>
                        </Tr>
                    ):(
                        courses?.map((course)=>(
                            <Tr key={course._id} className="flex gap-x-10 border-richblack-800 p-8">
                                <Td className='flex-gp-x-4'>
                                    <img
                                      src={course?.thumbnail}
                                      className='h-[150px] w-[220px] rounded-lg object-cover'
                                      alt='Thumbnail'
                                    />
                                    <div className='flex flex-col'>
                                        <p>{course?.courseName}</p>
                                        <p>{course?.courseDescription}</p>
                                        <p>Created:</p>
                                        {
                                            course.status===COURSE_STATUS.DRAFT?(
                                                <p className='text-pink-50'>DRAFTED</p>
                                            ):(
                                                <p className='text-yellow-50'>PUBLISHED</p>
                                            )
                                        }
                                    </div>
                                </Td>
                                <Td>
                                    2Hr 30Min
                                </Td>
                                <Td>
                                    ${course.price}
                                </Td>
                                <Td>
                                    <button
                                     disabled={loading}
                                     onClick={()=>{
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                     }}
                                     className='mr-[19px]'
                                    >
                                      EDIT
                                    </button>
                                    <button
                                     disabled={loading}
                                     onClick={()=>{
                                        setconfirmationModal({
                                            text1:"Do You want to delete this course",
                                            text2:"All the Data related to this course will be Deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler:!loading?()=>handleCourseDelete(course._id):()=>{},
                                            btn2Handler:!loading?()=>setconfirmationModal(null):()=>{},
                                        })
                                     }}
                                    >
                                        Delete
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CourseTable
