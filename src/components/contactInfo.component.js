import React, {useState, useContext} from "react";
import UserContext from "../context/UserContext";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ErrorNotice from "./misc/ErrorNotice";

// Sources:
// https://reactjs.org/docs/forms.html
// https://react-bootstrap.github.io/components/table/
// https://www.twilio.com/blog/send-an-sms-react-twilio

// page for adding contacts 
export default function ContactInfo() {
    const [contactname, setContactname] = useState();
    const [email, setEmail] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [date, setDate] = useState();

    const {userData} = useContext(UserContext);
    const history = useHistory();

    // submits a new contact with user entered information
    const submit = async (e) => {
        e.preventDefault();
    
        try{
          // creates new contact object 
          const newContact = {contactname, email, phonenumber, date};
          // post request for new contact
          await axios.post(
            "http://localhost:5000/contacts/add", 
            newContact,
            {headers: {"x-auth-token": userData.token}},
          );
          history.push("/contactPage");
      } catch(err){
          console.log("no");
        }
    };
    // register contact page form
    return (
        <div >
            <h1>Register a Contact</h1>
            <form onSubmit={submit}>
            <div className="form-group"> 
                <label class="required">Contact's Name: </label>
                <input type="text"
                    required
                    placeholder="Jane Doe"
                    className="form-control"
                    // sets entered contact name
                    onChange={(e) => setContactname(e.target.value)}
              />
            </div>
            <div className="form-group">
                <label>Contact's Email: </label>
                <input 
                    type="email" 
                    placeholder="123@gmail.com"
                    className="form-control"
                    required
                    // sets entered email 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label class="required">Contact's Phone Number: </label>
                <input 
                    type="tel" 
                    placeholder="11234567890"
                    className="form-control"
                    pattern="[1]{1}[0-9]{3}[0-9]{3}[0-9]{4}"
                    required
                    // sets entered phone number 
                    onChange={(e) => setPhonenumber(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label class="required">Date of Exposure: </label>
                    <input 
                    type="date"
                    placeholder="mm-dd-yy"
                    pattern="(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d"
                    className="form-control"
                    required
                    // sets entered date
                    onChange={(e) => setDate(e.target.value)}
                    />
        </div>

        <div className="form-group">
          <input type="submit" value="Submit Contact"/>
        </div>
        </form>
        <label class="required">Required Field: </label>
    </div>
    )
}