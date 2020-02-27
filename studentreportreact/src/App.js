import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet'

const TITLE = 'My Page Title'
function App() {
  return (
    <div className="App">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <header className="App-header">
      
      </header>
    </div>
  );
}

export default App;
