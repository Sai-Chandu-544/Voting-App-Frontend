import {RegistrationForm} from './user/userRegister'
import {LoginForm} from './user/userLogin'
import {Data} from './data/data'
import { HomePage } from  './homePage';
import {AdminLoginForm} from './admin/adminLogin.js'
import {AdminRegisterForm} from './admin/adminRegister.js'
import {AllVotes} from './admin/allVotes.js'
import {Routes,Route} from "react-router-dom"
import {UserProvider} from './user/context.js'
import { AuthProvider } from './auth.js';
import { PrivateRoute } from './privateRoutes.js';
import { PageNotFound } from './PageNotFound.js';





export const App=()=> {
  return (

<>
<AuthProvider>
<UserProvider>
 <Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="user/login" element={<LoginForm/>}/>
  <Route path="user/register" element={<RegistrationForm/>}/>
  <Route path="user/data" element={<PrivateRoute><Data/></PrivateRoute>}/>
  <Route path="admin/login" element={<AdminLoginForm/>}/>
  <Route path="admin/register" element={<AdminRegisterForm/>}/>
  <Route path="admin/allVotes" element={<AllVotes/>}/>
  <Route path="*" element={<PageNotFound/>}/>

   
             
</Routes>
    
    </UserProvider>
    </AuthProvider>

</>
    
     
      
   
  );
}

