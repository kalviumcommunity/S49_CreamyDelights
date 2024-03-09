// CartPage.js
import React from 'react';

function Cart({ cartItems }) {
  return (
    <div>
      <h1>Cart Items</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.flavor}</li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
