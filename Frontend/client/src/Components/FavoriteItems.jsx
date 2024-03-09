// FavoriteItems.jsx
import React from 'react';


function FavoriteItems({ favoriteItems }) {

  return (
    <div>
      <h1>Favorite Items</h1>
      <ul>
        
        {favoriteItems.map((item, index) => (
          <li key={index}>
            <div>
              <h3>{item.flavor}</h3>
              <img src={item.imageurl} alt={item.flavour} className="ice-cream-image" />
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteItems;
