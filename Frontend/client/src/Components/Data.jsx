import React from 'react';
import '../App.css'; 

const Data = () => {
  const data = [
    {
      flavor: "Strawberry",
      description: "Sweet and fruity, with real strawberry chunks or puree.",
      imageUrl: "https://example.com/strawberry.jpg" // Example image URL for Strawberry flavor
    },
    {
      flavor: "Chocolate",
      description: "Rich and indulgent, a favorite for chocolate lovers.",
      imageUrl: "https://example.com/chocolate.jpg" // Example image URL for Chocolate flavor
    }
  ];

  return (
    <div className='data'>
      {data.map((item, index) => (
        <div className="card" key={index}>
          <img src={item.imageUrl} alt={item.flavor} />
          <h2>{item.flavor}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Data;
