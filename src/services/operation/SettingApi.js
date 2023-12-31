import { toast } from "react-hot-toast"
import { settingsEndpoints } from "../apis"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import axios from "axios"
import { logout } from "./authApi"

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints

export function updateProfile(token,dateOfBirth, about, contactNumber) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("PUT", UPDATE_PROFILE_API, {dateOfBirth,about,contactNumber}, {
          Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        const userImage = response?.data?.data?.image
          ? response.data.updatedUserDetails.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.data?.firstName} ${response?.data?.data?.lastName}`
        dispatch(
          setUser({ ...response.data.updatedUserDetails})
        )
        toast.success("Profile Updated Successfully")
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile");
      }
      toast.dismiss(toastId)
  }
}

export function updateDisplayPhoto(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId);
  }
}


export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}