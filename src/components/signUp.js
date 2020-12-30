import React, {useState, useContext, useReducer} from "react";
import UserContext from "../context/UserContext";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import ErrorNotice from "./misc/ErrorNotice";
import './signup.css';
import contact from './images/contact3.jpg';

export default function Register(){
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [DOB, setDOB] = useState();
  const [gender, setGender] = useState();
  const [error, setError] = useState();

  const {setUserData} = useContext(UserContext);
  const history = useHistory();

  // Source:
  // MERN Stack Tutorial with Auth (8 part series):
  // https://www.youtube.com/watch?v=4_ZiJGY5F38

   // function that submits info related to new user
  const submit = async (e) => {
    e.preventDefault();

    try{
      // newUser object is created
      const newUser = {username, password, passwordCheck, firstname, lastname, address,
         phone, DOB, gender};
      console.log(newUser)
      // calls post route to add new user to database
      await axios.post(
        "http://localhost:5000/users/add", 
        newUser
      );
      // user is logged in
      const loginRes = await axios.post("http://localhost:5000/users/login", {
        username,
        password,
      });
      // user data including auth token is set
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      // auth token is set in local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
  } catch(err){
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  // Sign Up form which takes in user input in fields 
    return(
        <div className="wrapper">
          <div className="inner" >
            <div className="image-holder">
              <img src={contact} alt="contact"></img>
            </div>
            <form onSubmit={submit} >
              <h3>Sign Up</h3>
              <p>All fields are required for submission</p>
              {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
              )}

              <div>
                <input className="form-control"
                placeholder="Email"
                type = "email" 
                required 
                onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <input className="form-control"
                placeholder="First Name"
                type = "text" 
                required 
                onChange={(e) => setFirstName(e.target.value)}
                />    
              </div>  
              <div>
                <input className="form-control"
                placeholder="Last Name"
                type = "text" 
                required 
                onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <select name="gender"  onChange={(e) => setGender(e.target.value)}
                      className="form-control" required>
                  <option value="" className="form-control">--Gender--</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Gender Variant/Non-Conforming</option>
                  <option value="no_answer"> Prefer Not to Answer</option>
              </select>
              </div>
              <div>
                <input className="form-control"
                placeholder="Date of Birth: mm-dd-yy"
                type = "date" 
                required 
                pattern="(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d"
                onChange={(e) => setDOB(e.target.value)}
                />
              </div>

              <div>
                <input className="form-control"
                placeholder="Address"
                type = "text" 
                required 
                onChange={(e) => setAddress(e.target.value)}
                />
              </div>
                
              <div>
                <input className="form-control"
                placeholder="Phone Number: 1-555-555-5555"
                type = "tel" 
                pattern="[1]{1}[-][0-9]{3}[-][0-9]{3}[-][0-9]{4}"
                required 
                onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <input className="form-control"
                placeholder="Password"
                id="register-password" 
                type = "password" 
                required
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>  
                <input type = "password" className="form-control"
                placeholder="Verify password" 
                required
                onChange={(e) => setPasswordCheck(e.target.value)}
                />
              </div>
              <div className="button-control">
              <button style={{'margin-bottom': '30px'}} type="submit">Create Account</button>
              </div>
            </form>
          </div>
        </div>
    )
  } 