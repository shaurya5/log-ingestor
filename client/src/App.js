// query-interface/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search`, {
        params: { ...parseQuery(query) },
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Helper function to parse query string into object
  const parseQuery = (queryString) => {
    return queryString
      .split('&')
      .map((param) => param.split('='))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  };

  return (
    <div>
      <h1>Log Query Interface</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <div>
        <h2>Results:</h2>
        <ul>
          {results.map((log, index) => (
            <li key={index}>
              {JSON.stringify(log)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
