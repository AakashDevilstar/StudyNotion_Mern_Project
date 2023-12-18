import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operation/courseApi';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailSideBar from '../component/core/ViewCourse/VideoDetailSideBar';
import CouseReviewModal from '../component/core/ViewCourse/CouseReviewModal';

const ViewCourse = () => {
    const[reviewModal,setreviewModal]=useState(false);
    const {courseId}=useParams();
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    useEffect(()=>{
        const setCourseSpecifications=async()=>{
            const courseData=await getFullDetailsOfCourse(courseId,token);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setEntireCourseData(courseData?.courseDetails));
            // confusion hai isme
            dispatch(setCompletedLectures(courseData?.completedVideos));
            let lectures=0;
            courseData?.courseDetails?.courseContent?.forEach((ele)=>{
                lectures+=ele.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecifications();   
    },[]);

    return (
        <div>
            <div>
                <VideoDetailSideBar setreviewModal={setreviewModal}/>
                <div>
                    <Outlet/>
                </div>
            </div>
            {reviewModal && <CouseReviewModal setreviewModal={setreviewModal}/>}
        </div>
    )
}

export default ViewCourse
