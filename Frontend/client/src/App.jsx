// App.js
import React from 'react';
import './App.css'; 
import Navbar from './Components/Navbar'; // Import Navbar component
import axios from 'axios';
import { useState, useEffect } from 'react';


function App() {
  let [data, setData] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8000/getIcecream`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='app'>
      <Navbar /> {/* Render the Navbar component */}
      <h1 className='welcome'>Welcome to CreamyDelights</h1>
      {/* <div class="video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/kWpXIlvZyGY?si=_pNWdLKCsjxLqdjM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div> */}

      <div>
        {data && data.map((item) => {
          return (
            <div key={item._id} className="main">
              <h2>{item.flavor}</h2>
              <h4>{item.description}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
