import React from 'react';
import '../App.css'; 

const Data = () => {
  const data = [
    {
      flavor: "Strawberry",
      description: "Sweet and fruity, with real strawberry chunks or puree."
    },
    {
      flavor: "Chocolate",
      description: "Rich and indulgent, a favorite for chocolate lovers."
    }
  ];

  return (
    <div className='data'>
      {data.map((item, index) => (
        <div className="card" key={index}>
          <h2>{item.flavor}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Data;
