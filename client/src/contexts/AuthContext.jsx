import React, { useContext, useEffect, useState } from 'react'

const AuthContext = React.createContext();

export function useAuth(){
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [currentUser,setCurrentUser] = useState(undefined);

  function login(user){
    setCurrentUser(user || undefined);
    localStorage.setItem("currentUser" , JSON.stringify(user));
  }

  function logout(){
    setCurrentUser(undefined);
    document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.removeItem('currentUser');
    localStorage.removeItem('storageTracks');
  }

  const value = {
    currentUser,
    login,
    logout
  }
  useEffect(()=>{
    let userData = localStorage.getItem('currentUser');
    if(userData !== "undefined")userData= JSON.parse(userData);
    const val = userData || null;
    setCurrentUser(val);
  },[])
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
