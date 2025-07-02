import { createContext ,useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
  return localStorage.getItem("Token");
});
const [user,setUser]=useState()
 
  const login = (token,userData,user ) => {
      localStorage.setItem('Token', token);
      localStorage.setItem('User', user);
      localStorage.setItem('UserId', JSON.stringify(userData));
      setToken(token)
  
  };

  const navigate=useNavigate()

  const logout = () => {
 
    localStorage.removeItem('UserId');
    localStorage.removeItem('Token');
    localStorage.removeItem('User');
     navigate('/user/login');
  };

  return (
    <AuthContext.Provider value={{ user,token,login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
