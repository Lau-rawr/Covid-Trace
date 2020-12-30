import React, {useState, useContext} from "react";
import UserContext from "../context/UserContext";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import ErrorNotice from "./misc/ErrorNotice";
import  './signup.css';
import contact from './images/contact.jpg';

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  
  const {setUserData} = useContext(UserContext);
  const history = useHistory();

  // Source:
  // MERN Stack Tutorial with Auth (8 part series):
  // https://www.youtube.com/watch?v=4_ZiJGY5F38

  // submit function
  const submit = async (e) => {
    try{
      e.preventDefault();
      // new loginUser object is created
      const loginUser = {username, password};
      const loginRes = await axios.post("http://localhost:5000/users/login", loginUser);
      // sets userData object with auth token and user info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      // sets token in local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
  } catch(err){
    err.response.data.msg && setError(err.response.data.msg);
  }
  };

  // login form
  return(
      <div className="wrapper">
        <div className="inner" >
          <div className="image-holder2">
              <img id="contact"src={contact} alt="contact"></img>
          </div>
          <form onSubmit={submit} >
            <h3>Sign In</h3>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <div>
              <input type="text" className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username" />
            </div>
            <div>
              <input type="password" className="form-control"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" />
            </div>
            <input type= "submit" value="Log In" />
          </form>
        </div>
      </div> 
  )
} 