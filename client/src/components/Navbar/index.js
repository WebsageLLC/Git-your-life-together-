import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/GYLTlogo.png';
import Auth from '../../utils/auth';

const Navbar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    }
    return (

        <nav className="navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" height="50" className="d-inline-block" />
                </a>

                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" aria-current="page">My Projects</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/askchatgpt" className="nav-link">Ask Chat GPT</Link>
                    </li>
                    <Link to="/"><button className="btn btn-main" type="button" onClick={logout}>Logout</button></Link>
                </ul>
            </div>
        </nav>

    );
};

export default Navbar;