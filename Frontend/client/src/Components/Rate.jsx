import React, { useState } from 'react';
import './Rate.css'; // Import CSS file for styling

function Rate() {
  const [rating, setRating] = useState(0);
  const [flavor, setFlavor] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleFlavorChange = (event) => {
    setFlavor(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/postrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flavour: flavor,
          rate: rating,
          feedback: feedback, // Ensure this matches the field name in your schema
        }),
      });
      if (response.ok) {
        console.log('Rating submitted successfully!');
        // Reset the form after successful submission
        setFlavor('');
        setRating(0);
        setFeedback('');
      } else {
        console.error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="rate-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="flavor">Flavor:</label>
          <input type="text" id="flavor" value={flavor} onChange={handleFlavorChange} />
        </div>
     
        <div className="input-group">
          <label htmlFor="feedback">Description</label>
          <textarea id="feedback" value={feedback} onChange={handleFeedbackChange} />
        </div>
        <button type="submit" className="submit-button">Add Flavors</button>
      </form>
    </div>
  );
}

export default Rate;
