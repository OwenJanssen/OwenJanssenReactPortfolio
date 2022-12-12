import React, { useState } from 'react';
import './App.css';
import Pong from './Pong/Pong';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Gallery from './Gallery/Gallery';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <Gallery/>
            </div>
          } />
          <Route path="/pong" element={
            <div>
              <Pong/>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
