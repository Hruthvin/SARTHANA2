import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentAffairs = () => {
  const [currentAffairs, setCurrentAffairs] = useState([]);

  useEffect(() => {
    // Fetch current affairs from the backend
    axios.get('http://localhost:5000/current-affairs')
      .then((response) => {
        setCurrentAffairs(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the current affairs!', error);
      });
  }, []);

  return (
    <div>
      <h2>Current Affairs</h2>
      <ul>
        {currentAffairs.map((affair) => (
          <li key={affair._id}>
            <h3>{affair.title}</h3>
            <p>{affair.description}</p>
            <a href={affair.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentAffairs;
