import React, {useState, useEffect} from 'react';
import './App.css';
import Title from "./Components/Title/Title.js";
import Splash from "./Components/Splash/Splash.js"
import Blurb from "./Components/Blurb/Blurb.js"
import DataCell from "./Components/DataCell/DataCell.js"
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
