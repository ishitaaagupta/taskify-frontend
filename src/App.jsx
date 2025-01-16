import { useEffect, useState } from 'react'
import './App.css'
import { Header,Footer } from './components'
import {Outlet} from "react-router-dom"
import {useDispatch} from "react-redux"
import { login,logout } from './store/authSlice'




function App() {

  const dispatch = useDispatch()
const [loading,setLoading] = useState(true)


  useEffect(()=>{
    const state =JSON.parse(localStorage.getItem('myState'))
    if(state){
      dispatch(login(state))
    }else{
      dispatch(logout())
    }
    setLoading(false)
  },[])

  return !loading?(<div className='min-h-screen text-center flex-wrap bg-purple-200'> 
  <Header></Header>
   <main className='min-h-[600px]'>
    <Outlet/>
  </main>
<Footer></Footer>

  </div>):null
  }
  
  export default App
  

