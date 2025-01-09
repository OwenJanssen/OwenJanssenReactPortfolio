import React from 'react';
import { useNavigate } from "react-router-dom";
import GoBackButton from './GoBackButton';
import HomeButton from '../HomeButton';

const Title = () => {
    const nav = useNavigate();

    const returnHome = () => {    
        nav("/teacher-connect");
    };

    return <div className="flex-row header-row">
        <GoBackButton/>
        <div className={"title"} onClick={returnHome}>TeacherConnect</div>
        <HomeButton />
    </div>
}

export default Title;
