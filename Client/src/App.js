import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Title from "./Components/Title.js";
import Splash from "./Components/Splash.js"
import Blurb from "./Components/Blurb.js"
import DataCell from "./Components/DataCell.js"
function App() {
  const[apiResponse, setApiResponse] = useState("");

function callAPI() {
   fetch("http://localhost:4000/note")
       .then(res => res.json())
       .then(data => setApiResponse(data))
       
}

useEffect(() => {
  callAPI();
},[]);

  
  return (
    <div className="App">
      <Title />
      <Splash />
      <Blurb />
      <DataCell />
      <p className="App-intro">{apiResponse}</p>
    </div>
  );
}

export default App;
