import React, {useState, useContext} from "react";
import UserContext from "../context/UserContext";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import {useHistory} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ErrorNotice from "./misc/ErrorNotice";

// Sources:
// https://react-bootstrap.github.io/components/dropdowns/
// https://react.semantic-ui.com/modules/dropdown/
// https://reactjs.org/docs/forms.html
// https://blog.logrocket.com/building-a-custom-dropdown-menu-component-for-react-e94f02ced4a1/

// Daily Symptoms Page
export default function DailySymptoms() {
    const [symptoms, setSymptoms] = useState([]);
    const [fever, setFever] = useState();
    const [date, setDate] = useState();

    const {userData} = useContext(UserContext);
    const history = useHistory();

    // function that calls route to add symptoms to database for specific user
    const submit = async (e) => {
        e.preventDefault();
    
        try{
          const newRecord = {symptoms, fever, date};
          await axios.post(
            "http://localhost:5000/symptoms/add", 
            newRecord,
            {headers: {"x-auth-token": userData.token}},
          );
          history.push("/home");
      } catch(err){
          console.log("no");
        }
    };

    // daily symptom checker form
    return (
        <div >
            <h1>Daily Symptom Checker</h1>
            <form onSubmit={submit}>
            <div className="form-group"> 
            <select class="mdb-select md-form" onChange={(e) => setSymptoms(state => [...state, e.target.value])} multiple>
            <option value="" disabled selected> Please Select Any of the Following CDC Defined Symptoms of COVID-19 That You Have Experienced in the Last 24 Hours </option>
            <option value="coughing">Coughing</option>
            <option value="nausea">Nausea</option>
            <option value="dizziness">Dizziness</option>
            <option value="sorethroat">Sore Throat</option>
            </select>
            </div>
            <div className="form-group"> 
            <select class="browser-default custom-select" onChange={(e) => setFever(e.target.value)} required>
            <option disabled selected>Have you had a temperature of 100.4 or higher in the past 24h?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            </select>
            </div>
            <div className="form-group">
                <label>Date: </label>
                    <input 
                    type="date"
                    className="form-control"
                    placeholder="mm-dd-yy"
                    pattern="(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d"
                    onChange={(e) => setDate(e.target.value)}
                    />
        </div>

        <div className="form-group">
          <input type="submit" value="Submit Symptoms"/>
        </div>
        </form>
    </div>
    )
}

