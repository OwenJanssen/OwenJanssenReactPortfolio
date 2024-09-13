import './App.css';

import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import Pong from './components/Pong/Pong';
import HeaderAnimation from './components/HeaderAnimation/HeaderAnimation';
import TVRatings from './components/TV Ratings/TvRatings';
import { InfiniteMaze } from './components/InfiniteMaze/InfiniteMaze';
import { AboutMe } from './components/AboutMe/AboutMe';

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App" ref={containerRef}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div className={"home-page"}>
              <HeaderAnimation/>
              <Gallery/>
            </div>
          } />
          <Route path="/pong" element={
            <div>
              <Pong containerRef={containerRef}/>
            </div>
          } />
          <Route path="/tv-ratings" element={
            <div>
              <TVRatings/>
            </div>
          } />
          <Route path="/about-me" element={
            <div>
              <AboutMe/>
            </div>
          } />
          <Route path="/maze" element={
            <div>
              <InfiniteMaze containerRef={containerRef}/>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
