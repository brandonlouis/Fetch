import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ShowDog from './components/ShowDog';
import Footer from './components/Footer';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<ShowDog />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App;