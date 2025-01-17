import React, { useEffect, useState } from 'react'
import { TaskBoard } from '../components'
import { getAllTasks } from '../apirequests/tasks'
import { updateTask } from '../apirequests/tasks'

const AllTasks = () => {

    const [tasks,setTasks]= useState([])
    const [forcedUpdate,setForcedUpdate]= useState(false)
    const handleUpdateTask = async(taskId)=>{
        updateTask(taskId).then((data)=>{
                setForcedUpdate((prev)=>!prev)
            
        }).catch((error)=>{console.log(error)})
    }

    useEffect(()=>{
        getAllTasks().then((data)=>{
          setTasks(data)
        }).catch((error)=>{console.log(error)})
    },[forcedUpdate])


  return (
    <div className="py-8">

         <div className="container mx-auto p-4 bg-purple-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Task Board</h1>
          </div>
                <TaskBoard tasks={tasks} handleUpdateTask={handleUpdateTask}/>

        </div>
        
    </div>
  )
}

export default AllTasks