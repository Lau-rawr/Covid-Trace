// in order to access user
import React, {useContext} from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Link } from 'react-router-dom';

  // Source:
  // MERN Stack Tutorial with Auth (8 part series):
  // https://www.youtube.com/watch?v=4_ZiJGY5F38

export default function AuthOptions() {
    const {userData, setUserData} = useContext(UserContext);

    const history = useHistory();

    // takes user to respective pages when button is clicked
    const register = () => history.push("/signUp");
    const login = () => history.push("/");

    // if user clicks log out, set user data to undefined, remove the auth token in local storage, and send the user to login
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
        history.push("/");
    };

    // shows different options in the navbar based on if a verirfied user is logged in or not
    return (
        <nav className="auth-options">
        {userData.user ? (
            <>
            <Link to="/contactPage">Contacts </Link>
            <Link to="/contactInfo"> Add Contacts</Link>
            <Link to="/testResult"> Test Result </Link>
            <Link to="/dailySx"> Daily Symptoms </Link>
            <Link to="/resources"> Resources </Link>
            <button onClick={logout}>Log Out</button>
            </>
        ) : (
            <>
            <button onClick={register}>Sign Up</button>
            <button onClick={login}>Sign In</button>
            </>
        )}
        </nav>
    )
}
