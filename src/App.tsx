import './App.css';

import { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import Pong from './components/Pong/Pong';
import HeaderAnimation from './components/HeaderAnimation/HeaderAnimation';
import TVRatings from './components/TV Ratings/TvRatings';
import { InfiniteMaze } from './components/InfiniteMaze/InfiniteMaze';
import { AboutMe } from './components/AboutMe/AboutMe';
import ChorusHomepage from './components/Chorus/ChorusHomepage';
import Hotdogs from './components/Hotdogs/Hotdogs';
import Chorus from './components/Chorus/Chorus';
import { teacherConnectData as tcData } from './components/TeacherConnect/teacherConnectData';
import TeacherConnectHomepage from './components/TeacherConnect/TeacherConnectHomepage';
import TeacherPage from './components/TeacherConnect/TeacherPage';
import FormHelpGroups from './components/TeacherConnect/FormHelpGroups';
import StudentPage from './components/TeacherConnect/StudentPage';
import ConceptPage from './components/TeacherConnect/ConceptPage';
import LessonPage from './components/TeacherConnect/LessonPage';

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [teacherConnectData, setTeacherConnectData] = useState(tcData);

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
            <Pong containerRef={containerRef}/>
          } />
          <Route path="/tv-ratings" element={
            <TVRatings/>
          } />
          <Route path="/about-me" element={
            <AboutMe/>
          } />
          <Route path="/maze" element={
            <InfiniteMaze containerRef={containerRef}/>
          } />
          <Route path="/chorus" element={
            <ChorusHomepage />
          } />
          <Route path="/chorus/session/:id" element={
            <Chorus/>
          } />
          <Route path="/teacher-connect" element={
            <div className={"teacher-connect page-container"}>
              <TeacherConnectHomepage />
            </div>
          } />
          <Route path="/teacher-connect/teacher" element={
            <div className={"teacher-connect page-container"}>
              <TeacherPage data={teacherConnectData} setData={setTeacherConnectData} />
            </div>
          } />
          <Route path="/teacher-connect/teacher/groups" element={
            <div className={"teacher-connect page-container"}>
              <FormHelpGroups data={teacherConnectData} />
            </div>
          } />
          <Route path="/teacher-connect/:userClass/:studentName/landing-page" element={
            <div className={"teacher-connect page-container"}>
              <StudentPage data={teacherConnectData} />
            </div>
          } />
          <Route path="/teacher-connect/:userClass/:studentName" element={
            <div className={"teacher-connect page-container"}>
              <StudentPage data={teacherConnectData} />
            </div>
          } />
          <Route path="/teacher-connect/:userClass/concept/:conceptId/" element={
            <div className={"teacher-connect page-container"}>
              <ConceptPage data={teacherConnectData} setData={setTeacherConnectData} />
            </div>
          } />
          <Route path="/teacher-connect/:userClass/lesson/:lessonId/" element={
            <div className={"teacher-connect page-container"}>
              <LessonPage data={teacherConnectData} setData={setTeacherConnectData} />
            </div>
          } />
          <Route path="/hotdog-hangout" element={
            <Hotdogs />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
