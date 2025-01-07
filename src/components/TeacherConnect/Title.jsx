import React from 'react';
import { useNavigate } from "react-router-dom";
import GoBackButton from './GoBackButton';

const Title = () => {
    const nav = useNavigate();

    const returnHome = () => {    
        nav("/teacher-connect");
    };

    return <>
        <GoBackButton/>
        <div className="title" onClick={returnHome}>TeacherConnect</div>
    </>
}

export default Title;
