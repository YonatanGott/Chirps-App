import React, { useContext, useState } from 'react';
import "./NavBar.css";
import Foot from '../pics/navFoot.svg';
import {
    Link,
    useHistory
} from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase/firebase';

const Navbar = () => {
    const { logOut } = useContext(AuthContext)
    const [error, setError] = useState("")
    const history = useHistory()
    const [signedIn, setSignedIn] = useState(false)

    async function handleLogout() {
        setError("")

        try {
            await logOut()
            history.push("/SignIn")
        } catch {
            setError("Failed to log out")
        }
    }

    auth.onAuthStateChanged(user => {
        if (user) {
            setSignedIn(true);
        } else {
            setSignedIn(false)
        }
    })

    if (signedIn) {
        return (
            <div className="navbar">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <ul className="nav nav-list">
                            <li className="nav-link"><Link to="/">Home</Link></li>
                            <li className="nav-link"><Link to="/Profile">Profile</Link></li>
                        </ul>
                        {error && <div className="alert alert-info" role="alert">{error}</div>}
                        <button className='logout-btn btn' onClick={handleLogout}>
                            <span className="btn__content logout">Log_Out</span>
                        </button>
                    </div>
                </nav>
                <img className='nav-foot' src={Foot} alt='Woooooo...' />
            </div >
        )
    }
    else {
        return (
            <div className="navbar">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <ul className="nav nav-list">
                            <li className="nav-link"><Link to="/SignIn">Sign In</Link></li>
                            <li className="nav-link"><Link to="/SignUp">Sign Up</Link></li>
                        </ul>
                    </div>
                </nav>
                <img className='nav-foot' src={Foot} alt='Woooooo...' />
            </div >
        )
    };
}
export default Navbar;
