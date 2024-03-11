import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Navbar.css'; // Import CSS file for styling
import Modal from './Profile.jsx'; // Import Modal component

function Navbar({ cartItems, favoriteItems, removeFromCart }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal state
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to add item to favorites
  const addToFavorites = (item) => {
    // Add your logic to add item to favorites
    console.log('Adding to favorites:', item);
  };

  // Function to add item to cart
  const addToCart = (item) => {
    // Add your logic to add item to cart
    console.log('Adding to cart:', item);
  };
 
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">CreamyDelights</div>
        <div className="icons">
          {/* Link to Rate component */}
          <Link to="/rate">
            <img
              src="https://cdn-icons-png.flaticon.com/128/477/477406.png"
              alt="rate_icon"
              className="icon"
            />
          </Link>
          {/* Button to add to Favorites */}
          <button onClick={() => addToFavorites(item)}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/4207/4207539.png"
              alt="fav_image"
            />
          </button>
          {/* Button to add to Cart */}
          <button onClick={() => addToCart(item)}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/2698/2698507.png"
              alt="cart_image"
            />
          </button>
          <img
            src="https://cdn-icons-png.flaticon.com/128/7381/7381253.png"
            alt="Profile_icon"
            className="icon"
            onClick={toggleModal} 
          />
        </div>
      </div>
      -
      {/* Render modal if isModalOpen is true */}
      {isModalOpen && <Modal closeModal={toggleModal} />}
    </nav>
  );
}

export default Navbar;
