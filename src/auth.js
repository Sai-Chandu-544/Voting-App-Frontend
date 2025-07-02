import { createContext ,useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
 
  const login = (token,userData ) => {
      localStorage.setItem('Token', token);
      localStorage.setItem('UserId', JSON.stringify(userData));
      setToken(token)
  
  };

  const navigate=useNavigate()

  const logout = () => {
 
    localStorage.removeItem('UserId');
    localStorage.removeItem('Token');
     navigate('/user/login');
  };

  return (
    <AuthContext.Provider value={{ token,login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
