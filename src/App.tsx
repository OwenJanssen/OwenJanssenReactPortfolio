import './App.css';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import Pong from './components/Pong/Pong';
import TVRatings from './components/TV Ratings/TvRatings';

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
          <Route path="/tv" element={
            <div>
              <TVRatings/>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
