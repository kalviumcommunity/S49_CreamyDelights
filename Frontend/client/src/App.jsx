import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import FavoriteItems from './Components/FavoriteItems';
import Cart from './Components/Cart'; 
import Rate from './Components/Rate'; 
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';

function App() {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/getIcecream`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const addToFavorites = (item) => {
    setFavoriteItems([...favoriteItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem !== item));
  };

  return (
    <Router>
      <div className='app'>
        {/* Home page component */}
        <HomePage />

        {/* Navbar component */}
        <Navbar cartItems={cartItems} favoriteItems={favoriteItems} removeFromCart={removeFromCart} />

        {/* Main content */}
        <Switch>
          <Route exact path="/">
            <div>
              {data.map((item) => (
                <div key={item._id} className="main">
                  <h2>{item.flavor}</h2>
                  <img src={item.imageurl} alt={item.flavour} className="ice-cream-image" />
                  <h4>{item.description}</h4>

                  <button onClick={() => addToFavorites(item)}>
                    <img src="https://cdn-icons-png.flaticon.com/128/4207/4207539.png" alt="fav_image" />
                  </button>
                  <button onClick={() => addToCart(item)}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2698/2698507.png" alt="cart_image" />
                  </button>
                </div>
              ))}
            </div>
          </Route>
          <Route path="/favorites">
            <FavoriteItems favoriteItems={favoriteItems} />
          </Route>
          <Route path="/cart">
            <Cart cartItems={cartItems} /> {/* Assuming you have a Cart component */}
          </Route>
          {/* Route for Rate component */}
          <Route path="/rate">
            <Rate />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
