import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ShowDog from './pages/ShowDog';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ShowDog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;