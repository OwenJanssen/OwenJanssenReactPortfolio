import './App.css';

import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import Pong from './components/Pong/Pong';
import TVRatings from './components/TV Ratings/TvRatings';

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App" ref={containerRef}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <Gallery/>
            </div>
          } />
          <Route path="/pong" element={
            <div>
              <Pong containerRef={containerRef}/>
            </div>
          } />
          <Route path="/tv" element={
            <div>
              <TVRatings containerRef={containerRef}/>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
