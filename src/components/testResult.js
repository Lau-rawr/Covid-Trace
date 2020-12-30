import React, {useState, useContext, useEffect} from "react";
import UserContext from "../context/UserContext";
import axios from 'axios';
const url = 'https://api.cloudinary.com/v1_1/drqctijmr/image/upload';
const preset = 'rtgyg1zd';


export default function TestResults() {

    const [image, setImage] = useState('');
    // user data gets verified login credentials
    const {userData} = useContext(UserContext);

    // function that sets the image to the latest uploaded image
    const onChange = e => {
      setImage(e.target.files[0]);
    };
    
    // latest image url is fetched using get route 
    const fetchImage = async () => {
      const image = await axios.get(
        "http://localhost:5000/images/getLatest", 
        {headers: {"x-auth-token": userData.token}},
        );
        setImage(image.data);
    }

    // when page loads, latest image is displayed using get route
    useEffect(() => {
      const fetchImage = async () => {
        const image = await axios.get(
          "http://localhost:5000/images/getLatest", 
          {headers: {"x-auth-token": userData.token}},
          );
          setImage(image.data);
        }
        fetchImage();  
    }, [userData.token])

    // formData is used for user to be able to select file from computer
    const submit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', preset);
      try {
        const res = await axios.post(url, formData);
        // image url is parsed from response
        const imageUrl = res.data.secure_url;
        // image url is posted using post route
        const image = await axios.post("http://localhost:5000/images/upload",
          {imageUrl},
          {headers: {"x-auth-token": userData.token}},
        );
        setImage(image.data);
        //history.push("/home");
        fetchImage();
        console.log(image.data);
      } catch (err) {
        console.error(err);
      }
    };

    // form to submit a test image
    return (
    <div className='container'>
      <h1 className='center red-text'>Test Result Image Upload</h1>
        <form onSubmit={submit} >
          <input type='file' name='image' onChange={onChange} />
      <div className="form-group">
          <input type="submit" value="Submit Test Image"/>
        </div>
      </form>
      {/* image url is used to display image */}
      <img src={image} alt="Test Result"/>
      </div>
    )
}
