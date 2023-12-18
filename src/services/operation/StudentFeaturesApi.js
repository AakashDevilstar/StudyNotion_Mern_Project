import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const {CHECK_OUT_API} = studentEndpoints;

export async function Checkout(courses,token){
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT",CHECK_OUT_API,
          {courses},
          {
            Authorization: `Bearer ${token}`,
          }
        )
        console.log("Heelo Ji Payment HOgai",response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Payment Done Well Done");
    }
    catch (error) {
        console.log("CHeckout API ERROR............", error);
        toast.error("Payment Fail");
    }
    toast.dismiss(toastId);
}