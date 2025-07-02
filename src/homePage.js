import voting_image from './images/voting_image.png'
import { Link } from "react-router-dom";


export const HomePage = () => {
  return (
  <div className="main-conatiner">
     <div className="home-page">
      <nav className="navbar">
        <div className="navbar-left">
         <img src={voting_image} alt="background"/>
          <span className="logo-text">Voting App</span>
        </div>
       <div className="navbar-right">
  <Link to="/user/login">Login</Link>
  <Link to="/user/register">Register</Link>
</div>

      </nav>

      <main className="hero">
        <h1>Welcome to Voting App</h1>
        <div className="hero-container">
            <p> Secure </p>
            <p> Transparent </p>
            <p> Easy Voting</p>

        </div>
        <button className="hero-btn">Get Started</button>

        
      </main>
    </div>

  </div>
   
  );
};


