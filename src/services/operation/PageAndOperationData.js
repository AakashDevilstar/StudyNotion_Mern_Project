import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

const {CATALOGPAGEDATA_API}=catalogData;

const PageAndOperationData = async(categoryId) => {
    const toastId=toast.loading("Loading....");
    let result=[];
    try{
        const response= await apiConnector("POST",CATALOGPAGEDATA_API,{categoryId:categoryId,});
        if(!response?.data?.success){
            throw new Error("Could not Fetch Category page Data");
        }
        result=response?.data;
    }
    catch(err){
        console.log("CATALOG PAGE DATA API ERROR....",err);
        toast.error(err.message);
        result=err.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}

export default PageAndOperationData
