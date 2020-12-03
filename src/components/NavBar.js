import React from 'react';
import "./NavBar.css";
import Foot from '../pics/navFoot.svg';
import {
    Link
} from "react-router-dom";

const Navbar = () => {

    return (
            <div className="navbar">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <ul className="nav nav-list">
                            <li className="nav-link"><Link to="/">Home</Link></li>
                            <li className="nav-link"><Link to="/Profile">Profile</Link></li>
                        </ul>
                    </div>
                </nav>
                <img className='nav-foot' src={Foot} alt='Woooooo...' />
            </div >
    );
}
export default Navbar;
