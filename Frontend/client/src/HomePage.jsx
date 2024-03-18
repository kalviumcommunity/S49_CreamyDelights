import React from 'react';
import vanillaIceCreamVideo from './assets/vanillaicecream.mp4'; 
import './HomePage.css'; 

function HomePage() {
  return (
    <div className="home-container">
   <div className='welcome'>  <h1>Welcome to CreamyDelights</h1> </div> 
      <div className="video-container">
        <video width="780" height="450" autoPlay muted loop>
          <source src={vanillaIceCreamVideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default HomePage;
