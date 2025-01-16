import React from 'react'
import { userLogout } from '../../apirequests/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'



const LogoutBtn = ({isOpen}) => {
  const dispatch = useDispatch()

  const handleLogout = async()=>{

  try {
      const response =await userLogout()
      if(response?.success){
        dispatch(logout())
      }
  } catch (error) {
    console.log("error logging out, ",error)
    
  }


  }

  return (

   <button className={`inline-block px-4 py-2 bg-purple-500 hover:bg-purple-700 text-white rounded-full duration-200`} onClick={handleLogout} >Logout</button>
  )
}

export default LogoutBtn