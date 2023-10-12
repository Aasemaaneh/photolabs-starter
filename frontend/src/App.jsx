import React from 'react';
import HomeRoute from './routes/HomeRoute';
import useApplicationData from './hooks/useApplicationData';

const App = () => {
  const applicationData = useApplicationData(); // Get all the data and functions

  return (
    <div className="App">
      <HomeRoute {...applicationData} /> {/* Pass all data and functions to HomeRoute */}
    </div>
  );
};

export default App;
