import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Title from "./Components/Title.js";
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
    
    <header className="Title">
      Detonation Database
    </header>
    <p className="App-intro">{apiResponse}</p>
</div>
  );
}

export default App;
