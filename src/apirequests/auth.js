const userSignup = async({email,password,name})=>{
    try {
        const response = await fetch(`http://localhost:3000/api/v1/users/signup`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({email:email,password:password,fullName:name})
          });

          const jsondata = await response.json()
          console.log(jsondata)
          return jsondata
        
    } catch (error) {

        console.log("error signing up, ",error)
        
    }
}

const userLogin = async({email,password})=>{
  try {
      const response = await fetch(`http://localhost:3000/api/v1/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({email:email,password:password}),
        });
        const jsondata = await response.json()
        return jsondata
  } catch (error) {
    console.log("error logging in ",error)
  }

}

const userLogout = async () => {
    try {
        let token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/api/v1/users/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        }      });
      
      if (response.ok) {
        const jsondata =await response.json()
        localStorage.removeItem("token")
        localStorage.removeItem("myState")
        return jsondata
      } else {
        console.log("Logout failed", response.statusText);
      }
    } catch (error) {
      console.log("Error logging out ", error);
    }
  };
  

export {userSignup,userLogin,userLogout}