import React from 'react';
import '../assets/css/App.css';
import Navigation from './Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 classname="bgf">
          Javis
        </h2>
      </header>
      <div className="container">
        <Navigation />
      </div>
    </div>
    
  );
}

export default App;
