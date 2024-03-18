import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Components/Navbar';
import FavoriteItems from './Components/FavoriteItems';
import Cart from './Components/Cart';
import Rate from './Components/Rate';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [username, setUsername] = useState([]);
  const [selecteduser, setSelectedUser] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/getUserData/names`)
      .then(res => {
        console.log(res.data.Names);
        setUsername(res.data.Names);
      })
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

  const fetchFlavour = async () => {
    try {
      let apiurl = `http://localhost:8000/getIcecream`;
      const response = await axios.get(apiurl);
      const responseData = response.data;
      const filteredData = responseData.filter(item => item.username === selecteduser);
      setData(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error('Error fetching ice cream data:', error);
    }
  };
  
  useEffect(() => {
    fetchFlavour();
  }, [selecteduser]);
  

  return (
<Router>
      <div className='app'>
        <HomePage />
        <Navbar cartItems={cartItems} favoriteItems={favoriteItems} removeFromCart={removeFromCart} />
        <Switch>
          <Route exact path="/">
            <div>
            <select name="username" id="username" value={selecteduser} onChange={(e)=> {setSelectedUser(e.target.value),console.log(e.target.value)}}>
                <option>Select username</option>
                {username.map((name, index) => (
                  <option key={index} value={name}>{name}</option>

                ))}
              </select>
              {data.map((item) => (
                <div key={item._id} className="main">
                  <h2>{item.flavor}</h2>
                  <img src={item.imageurl} alt={item.flavor} className="ice-cream-image" />
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
            <Cart cartItems={cartItems} />
          </Route>
          <Route path="/rate">
            <Rate />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
