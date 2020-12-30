import React, {useEffect, useContext, useState} from "react";
import UserContext from "../context/UserContext";
import {useHistory} from "react-router-dom";
import ReactDOM from 'react-dom';
import useHover from './use-hover';
import './home.css'
import banner from  './images/photo2.jpg';
import banner2 from './images/image7.jpg';
import prevention from './images/image6.jpg';


// https://usehooks.com/useHover/ webpage that helped
//https://codesandbox.io/s/divine-water-n1b6x?file=/src/index.js
//https://codesandbox.io/embed/01yl7knw70
//https://github.com/sbayd/react-flippy
//https://reactjsexample.com/flipping-cards-for-your-react-projects/
//this one https://codesandbox.io/s/recursing-kirch-2gy5g
//https://codesandbox.io/s/01w2zmj010?file=/src/index.js:263-465
       
export default function HomePage() {
  const {userData} = useContext(UserContext); 
  const history = useHistory();
  const [hoverRef0, isHovered0] = useHover();
  const [hoverRef1, isHovered1] = useHover();
  const [hoverRef2, isHovered2] = useHover();
  const [hoverRef3, isHovered3] = useHover();

 

  useEffect(() => {
    if(!userData.user) history.push("/");
  });
//https://www.cdc.gov/coronavirus/2019-ncov/faq.html facts

  return ( 
    <>
    <img class="banner1" src={banner} alt="Molecules" />
    <img class="banner3" src={prevention} alt="prevention" />
    <div class="flippers" >
      <div class="box">
        <p id="box1" ref={hoverRef0} style={{backgroundColor: isHovered0 ? '#00abff' : '#0080cc',paddingTop: isHovered0? '95px' : '75px'}}>
              {isHovered0 ?  '12-14 days!' : 'What is the incubation period of COVID-19?' }
        </p>
          
        <p id="box2"ref={hoverRef1} 
        style={{backgroundColor: isHovered1 ? '#DA70D6'  : '  #b24cff',paddingTop: isHovered1 ? '2px' : '100px' }}> {isHovered1 ? ' Someone who was within 6 feet of an infected person for a cumulative total of 15 minutes or more over a 24-hour period starting from 2 days before illness onset' : 'What is close contact?' }
        </p>
      </div>

      <div class="box">
        <p  id="box3"ref={hoverRef2} style={{backgroundColor: isHovered2 ? '#30c23d' : '#20B2AA',  paddingTop: isHovered2 ? '20px' : '75px' }}> {isHovered2 ?  'As of now, CDC has no data to suggest that coronaviruses are spread by mosquitoes or ticks. The main form of transmission is from person to person. ' : 'Can mosquitoes or ticks spread the virus that causes COVID-19?' }
        </p>
        
        <p  id="box4"ref={hoverRef3} style={{backgroundColor : isHovered3 ? '#ffc200' : '#de8a24',paddingTop: isHovered3 ? '25px' : '85px'}}> {isHovered3 ? 'Most people with coronavirus who have symptoms will no longer be contagious by 10 days after symptoms resolve. ' : 'How long is an infected person contagious?' }
        </p>
      </div>
      
</div>
<img class= "banner2" src={banner2} alt="All together" />
</>


  )
}