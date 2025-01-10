import React from 'react';
import { useNavigate } from 'react-router-dom';
import pencil_icon from './pencil_icon.svg';
import { SaveHistory } from './helper';
import { routeInfo } from './teacherConnectData';
import HomeButton from '../HomeButton';

import "./TeacherConnect.css"

const TeacherConnectHomepage = () => {
    const navigate = useNavigate();
    React.useEffect(()=>{
        routeInfo.setCurrentRoute({name:"Home",route:"/teacher-connect"})
    },[])

    const nextPage = (newUserClass) => {
        switch (newUserClass) {
            case 'TEACHER':
                SaveHistory(navigate,'/teacher-connect/teacher');
                break;
            case 'PARENT':
                SaveHistory(navigate,'/teacher-connect/parent/emma-smith');
                break;
            case 'STUDENT':
                SaveHistory(navigate,'/teacher-connect/student/emma-smith');
                break;
            default:
                console.error(`Invalid user class: ${newUserClass}`);
          }
    };

    return <div className="homepage">
        <div>
            <div className="welcome-text">Welcome to TeacherConnect!</div>
            <img src={pencil_icon} className="logo" alt="Pencil logo" />
            <div className="user-class-buttons">
                <button className="user-class-button" onClick={() => nextPage('TEACHER')}>Teacher</button>
                <button className="user-class-button" onClick={() => nextPage('PARENT')}>Parent</button>
                <button className="user-class-button" onClick={() => nextPage('STUDENT')}>Student</button>
                <HomeButton/>
            </div>
        </div>
    </div>
};

export default TeacherConnectHomepage;
