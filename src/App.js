import React from 'react';
import './App.css';
import Header from './components/Header';
import ShowDog from './components/ShowDog';

const App = () => {
  return (

    <div className="contentContainer">
      <Header />
      <ShowDog />
    </div>

  )
}

export default App;
