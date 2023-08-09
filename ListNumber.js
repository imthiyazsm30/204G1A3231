import React, { useState } from 'react';

function ListNumber() {
  const [numbers, setNumbers] = useState([]);
  const [urls, setUrls] = useState([]);

  /*const fetchNumbers = () => {
    const fetchPromises = urls.map(url =>
      fetch(`/numbers?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
    );

    Promise.all(fetchPromises)
      .then(dataArray => {
        const allNumbers = dataArray.flatMap(data => data.numbers);
        setNumbers(allNumbers);
      })
      .catch(error => console.error("Error fetching data:", error));
  };*/

  const fetchNumbers = () => {
    const fetchPromises = urls.map(url =>
      fetch(url)
        .then(response => response.json())
    );
  
    Promise.all(fetchPromises)
      .then(dataArray => {
        const allNumbers = dataArray.flatMap(data => data.numbers);
        setNumbers(allNumbers);
      })
      .catch(error => console.error("Error fetching data:", error));
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    setUrls([...urls, '']);
  };

  return (
    <div>
      <h1>Number Management App</h1>
      {urls.map((url, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => handleUrlChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={addUrlField}>Add URL</button>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      <div>
        {numbers.length > 0 && (
          <pre>{`numbers: ${JSON.stringify(numbers)}`}</pre>
        )}
      </div>
    </div>
  );
}

export default ListNumber;