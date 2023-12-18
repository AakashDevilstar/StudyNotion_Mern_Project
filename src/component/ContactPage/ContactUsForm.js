import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form'; 
import { contactusEndpoint } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
import CountryCode from "../../data/countrycode.json"

function ContactUsForm() {
    const [loading,setloading]=useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    const submitContactForm=async(data)=>{
        console.log("Logging Data",data);
        try{
            setloading(true);
            // const ans=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
            const ans={status:"OK"};
            console.log("Logging response",ans);
            setloading(false);
        }
        catch(err){
            console.log("Error:",err.message);
            setloading(false);
        }
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful]); 

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex flex-col gap-14'>
            <div className='flex gap-5'>
                {/* firstName */}
                <div className='flex flex-col'>
                    <label htmlFor='firstname'>First Name</label>
                    <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className='text-black'
                    placeholder='Enter first Name'
                    {...register("firstname",{required:true})}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter Your Name
                            </span>
                        )
                    }
                </div>
                {/* lastName */}
                <div className='flex flex-col'>
                    <label htmlFor='lastname'>Last Name</label>
                    <input
                    type="text"
                    name="lastname"
                    className='text-black'
                    id="lastname"
                    placeholder='Enter Last Name'
                    {...register("lastname")}
                    />
                    {
                        errors.lastname && (
                            <span>
                                Please enter Your Name
                            </span>
                        )
                    }
                </div>
            </div>
            {/* email */}
            <div className='flex flex-col'>
                <label htmlFor='email'>Email Address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className='text-black'
                    placeholder='Enter email Address'
                    {...register("email",{required:true})}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>
            {/* phoneNo */}
            <div className='flex flex-col'>
                <label htmlFor='phonenumber'>Phone Number</label>
                <div className='flex flex-row gap-5'>
                    {/* dropdown */}
                    {/* ye neche class mai jo likha hai wo imp hai  */}
                        <select
                         name="dropdown"
                         id="dropdown"
                         className='bg-yellow-50 w-[80px]'
                         {...register("countrycode",{required:true})}
                        >
                            {
                                CountryCode.map((element,idx)=>{
                                    return (
                                        <option key={idx} value={element.code} className='bg-richblack-600'>
                                            {element.code}-{element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    {/* ye neche class mai jo likha hai wo imp hai */}
                        <input
                         type='number'
                         name='phonenumber'
                         id='phonenumber'
                         placeholder='12345 67890'
                         className='text-black w-[calc(100%-90px)]'
                         {...register("phoneNo",
                         {required:{value:true,message:"Please enter Phone Number"},
                          maxLength:{value:10,message:"Invalid Phone Number"},
                          minLength:{value:8,message:"Invalid Phone Number"} })}
                        />
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }
            </div>
            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor='message'>Message</label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    className='text-black'
                    rows="7"
                    placeholder='Enter your message here'
                    {...register("message",{required:true})}
                />
                {
                    errors.message && (
                        <span>
                            Please enter your message.
                        </span>
                    )
                }
            </div>
            <button type="submit" className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black'>
                Send Message
            </button>
        </div>
    </form>
  )
}

export default ContactUsForm
