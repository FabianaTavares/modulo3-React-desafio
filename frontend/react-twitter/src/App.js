import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';
import Spinner from './components/Spinner';
import Twitter from './components/Twitter';

export default function App() {
  const [allTwitters, setAllTwitters] = useState([]);

  useEffect(() => {
    const getTwitters = async () => {
      const twitters = await api.getAllTwitters();
      setTimeout(() => {
        setAllTwitters(twitters);
      }, 2000);
    };
    getTwitters();
  }, []);

  const handlePersistData = async (formData) => {
    await api.insertTweet(formData);
    setAllTwitters([...allTwitters, formData]);
  };

  return (
    <div>
      <h1 className="center">React Twitter</h1>

      {allTwitters.length === 0 && <Spinner />}

      {allTwitters.length > 0 && (
        <Twitter
          twitters={allTwitters}
          onSave={handlePersistData}
        />
      )};
    </div>
  );
}

