const addTask = async({taskName,taskDescription,dueDate,project,tags,assignedTo})=>{

    console.log(taskName,taskDescription,dueDate,project,tags,assignedTo)
    try {
        let token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/api/v1/tasks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`

            },
            body:JSON.stringify({taskName,taskDescription,dueDate,project,tags,assignedTo}),
          });
          const jsondata = await response.json()
          console.log(jsondata)
          return jsondata
    } catch (error) {
      console.log("error adding project ",error)
    }
}

const updateTask = async(taskId,taskStatus)=>{
if(taskStatus){
    try {
        let token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`

            },
            body:JSON.stringify({taskStatus}),
          });
          const jsondata = await response.json()
          console.log(jsondata)
          return jsondata
    } catch (error) {
      console.log("error adding project ",error)
    }
  }
}

const getAllTasks = async()=>{
    try {
        let token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/api/v1/tasks/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`

            },
          });
          const jsondata = await response.json()
    
          return jsondata?.data
    } catch (error) {
      console.log("error adding project ",error)
    }
}

export  {addTask,updateTask,getAllTasks}