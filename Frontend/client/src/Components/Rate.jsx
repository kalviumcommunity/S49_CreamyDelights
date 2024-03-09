import React, { useState } from 'react';
import './Rate.css'; // Import CSS file for styling

function Rate() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [flavor, setFlavor] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleMouseOver = (index) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const handleClick = (index) => {
    setRating(index);
  };

  const handleFlavorChange = (event) => {
    setFlavor(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/postrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flavour: flavor,
          rate: rating,
          Feedback: feedback,
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
        <div className="rating-group">
          {[...Array(5)].map((_, index) => {
            const starId = index + 1;
            return (
              <span
                key={index}
                className={starId <= (hover || rating) ? 'star-filled' : 'star-empty'}
                onMouseOver={() => handleMouseOver(starId)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(starId)}
              >
                &#9733;
              </span>
            );
          })}
          <p>You rated: {rating}</p>
        </div>
        <div className="input-group">
          <label htmlFor="feedback">Feedback:</label>
          <textarea id="feedback" value={feedback} onChange={handleFeedbackChange} />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Rate;
