// Navbar.js
import React, { useState } from 'react';
import './Navbar.css'; // Import CSS file for styling
import Modal from './Profile.jsx'; // Import Modal component

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal state
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">CreamyDelights</div>
       
        <div className="icons">
          <img
            src="https://cdn-icons-png.flaticon.com/128/4207/4207539.png"
            alt="Heart_icon"
            className="icon"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/2698/2698507.png"
            alt="Cart_icon"
            className="icon"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/7381/7381253.png"
            alt="Profile_icon"
            className="icon"
            onClick={toggleModal} // Open modal on click
          />
        </div>
      </div>
      {/* Render modal if isModalOpen is true */}
      {isModalOpen && <Modal closeModal={toggleModal} />}
    </nav>
  );
}

export default Navbar;
