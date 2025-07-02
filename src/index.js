import ReactDOM from 'react-dom/client';
import './HomePage.css'; 
import './RegistrationPage.css';
import './LoginPage.css';
import './App.css'
import {App} from './App';
import './data/data.css'
import './admin/allVotes.css'
import {HashRouter} from "react-router-dom"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
 <HashRouter>

         <App />
    </HashRouter>


);

