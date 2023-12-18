import React, { useState } from 'react'

import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operation/authApi'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLinks from './SidebarLinks'
import { useNavigate } from 'react-router-dom'
import {VscSignOut} from "react-icons/vsc"
import ConfirmationModal from '../../Common/ConfirmationModal'

const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if(profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }

  return (
    <div>
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLinks key={link.id}  link={link} iconName={link.icon}/>
                        )
                    })}
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
            <SidebarLinks
                link={{ name: "Settings", path: "/dashboard/settings" }}
                iconName="VscSettingsGear"
          />
        </div>
    </div>
  )
}

export default Sidebar
