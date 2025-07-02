import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './auth.js';

export const PrivateRoute = ({ children }) => {
   const {token} = useContext(AuthContext);
//    console.log("Token from PrivateRoutes",token)
  return token ? children : <Navigate to="/user/login" />;
};


 