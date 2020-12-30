import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import AuthOptions from '../components/AuthOptions';

// Navbar component and calls AuthOptions to display nav options based on logged in status
function Navbar(props) {
    return (
        <header id="navbar">
            <Link to="/home"><h1 className= "title">Covid-Trace</h1></Link> 
            <AuthOptions />
        </header>
      );
  
}

export default withRouter(Navbar);