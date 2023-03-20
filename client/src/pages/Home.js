import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/GYLTlogo.png';
import happyGuy from '../assets/illustration1.png';
import Auth from '../utils/auth';
import Landing from '../pages/Landing';


const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <div className="container-fluid">
      {loggedIn ? (
        <div>
          <Landing />{" "}
        </div>
        
      ) : (
   
    <div className="container-fluid">

      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img className="d-inline-block animate__animated animate__rotateIn" src={logo} alt="Logo" height="50rem" />
          </a>
          <ul className="nav justify-content-end">
            {/* <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">My Projects</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Ask Chat GPT</a>
                    </li> */}
            <Link to="/login"><button className="btn btn-outline me-2" type="button">Log In</button></Link>
            <Link to="/signup"><button className="btn btn-main" type="button">Sign Up</button></Link>
          </ul>
        </div>
      </nav>

      <div className="container" style={{ height: '45rem' }}>
        <div className="row m-5">
          <div className="col-md-6 d-flex flex-wrap justify-content-center align-content-center">
            <div>
              <h3 className="animate__hinge"><strong>Git your life together!</strong></h3>
              <h5>For when you need help getting started</h5>
              <Link to="/signup"><button className="btn btn-main mt-4" type="button">Sign Up Today</button></Link>
            </div>
          </div>
          <div className="img-fluid col-md-6">
            <img src={happyGuy} width="400rem" className="animate__animated animate__fadeIn" />
          </div>
        </div>
      </div>
      </div>
)}
    </div>
  );
};

export default Home;