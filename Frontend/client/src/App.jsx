// App.js
import React from 'react';
import './App.css'; 
// import Data from './Components/Data';
import axios from 'axios'
import { useState, useEffect } from 'react';

function App() {
  let  [data, setData] = useState()

  useEffect(()=>{
    axios.get('http://localhost:8000/getIcecream').then(res => setData(res.data)).catch(err => console.error(err))
  })
  return (
    <div>
      <h1 className='welcome'>Welcome to CreamyDelights</h1>
      {/* <Data /> */}
      <div>{data && data.map((item)=>{
        return(
          <div key={item._id} className="main">
            <h2>{item.flavor}</h2>
            <h4>{item.description}</h4>
          </div>
        )
      })}</div>
    </div>
  );
}

export default App;
