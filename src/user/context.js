
import { createContext, useState } from 'react';

// 1. Create the context
export const UserContext = createContext();

// 2. Create the provider
export const UserProvider = ({ children }) => {
const [name,setName]=useState("")
// console.log("Name from Context",name)


  return (
    <UserContext.Provider value={{name,setName}}>  
      {children}
    </UserContext.Provider>
  );
};
