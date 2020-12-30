import React, {useState, useContext, useEffect, useCallback} from "react";
import axios from 'axios';
import UserContext from "../context/UserContext";

export default function ContactPage() {
    const {userData} = useContext(UserContext);
    const[allContacts, addContact] = useState([{}]);
    const [submitting, setSubmitting] = useState(false);

    // Sources:
    // https://reactjs.org/docs/forms.html
    // MERN Stack Tutorial with Auth (8 part series):
    // https://www.youtube.com/watch?v=4_ZiJGY5F38
    // https://www.twilio.com/blog/send-an-sms-react-twilio
    //  email with phil from twilio blog (11/23 & 11/24)


    // function that gets all of the contacts for a specific user
    const fetchItems = async () => {
      const response = await axios.get(
        "http://localhost:5000/contacts/all", 
        {headers: {"x-auth-token": userData.token}},
        );
        addContact(response.data);
        console.log("refreshed");
      }

    // deletes specific contact for a specific user
    const deleteContact = async (i) => {
      console.log(i);
      await axios.delete(
        "http://localhost:5000/contacts/" + i, 
        {headers: {"x-auth-token": userData.token}},
      );
      fetchItems()
    }
    
    // when page runs, function that gets all of the contacts for a specific user
    useEffect(() => {
        const fetchItems = async () => {
          const response = await axios.get(
            "http://localhost:5000/contacts/all", 
            {headers: {"x-auth-token": userData.token}},
            );
            addContact(response.data);
            console.log("refreshed");
          }
        fetchItems();  
    }, [userData.token])

        // function that texts contacts using twilio if text button is clicked
        const textContact = useCallback((contact) => {
          setSubmitting(true);
          fetch("http://localhost:5000/contacts/api/messages", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ to: contact.phonenumber, body: 'This text is to inform you that you may have been exposed to Covid-19 on ' + contact.date}),
                  })
            .then((res) => res.json())
            .then((data) => {
              setSubmitting(false);
              if (data.success) {
                alert('Message sent successfully');
              } else {
                alert('Message failed, try again!');
              }
        });
      }, []);
      
      // Logged Contacts Table
      return (
        <div>
          <h3 id="header">Logged Contacts</h3>
          <table className="table">
            <thead className="thead-light">
            <tr>
                <th id="rowhead">Contact Name</th>
                <th id="rowhead">Contact Email</th>
                <th id="rowhead">Contact Phone Number</th>
                <th id="rowhead">Exposure Date</th>
                <th id="rowhead">Actions</th>
                <th id="rowhead">Message</th>
              </tr>
            </thead>
            <tbody>
                {allContacts.map((contact, i) => {
                return(
                    <tr>
                    <td id="rowhead">{contact.contactname}</td>
                    <td id="rowhead">{contact.email}</td>
                    <td id="rowhead">{contact.phonenumber}</td>
                    <td id="rowhead">{contact.date}</td>
                    <td id="contact">
                    <button onClick={() => deleteContact(contact._id)} >Delete</button>
                    </td>
                    <td id="contact">
                    <button className="button muted-button" onClick={() => textContact(contact)}>Text</button>
                    </td>
                    </tr>
                )})}
            </tbody>
        </table>
        </div>
    )
}

