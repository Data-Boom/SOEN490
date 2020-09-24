import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const[apiResponse, setApiResponse] = useState("");

function callAPI() {
   fetch("http://localhost:4000/note")
       .then(res => res.json())
       .then(data => setApiResponse(data))
       
}

useEffect(() => {
  // Update the document title using the browser API
  console.log("reaced");
  callAPI();
},[]);

  
  return (
    <div className="App">
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React!!!!!!</h1>
    </header>
    <p className="App-intro">{apiResponse}</p>
</div>
  );
}

export default App;
