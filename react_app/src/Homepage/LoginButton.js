import React from 'react';
import { Link } from 'react-router-dom';
import './LoginButton.css';

const loginButton = () => {
    return (
        <div id='loginButtons' className="LoginGroup">
            <ul>
                <li>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <div id='loginButtonAdmin' className="login-card">
//
                            <p className="user-type">Administratorius</p>
                        </div>
                    </Link>
                </li>

                <li>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <div id='loginButtonUser' className="login-card">
//
                            <p className="user-type">Vartotojas</p>
                        </div>
                    </Link>
                </li>


            </ul>
        </div>
    )
};

export default loginButton;
