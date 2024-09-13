import './AboutMe.css'
import '../../App.css'
import React from 'react';
import { School, SchoolType } from './School';

export const AboutMe = () => {
    return <div className="page-container about-me">
        <div className="page-title">About Me</div>

        <div className="schools-section">
            <School
                schoolType={SchoolType.HighSchool}
                name={"Evanston Township High School"}
                graduationYear={2019}
                gpa={0}
                activities={["Math Team", "Debate"]} />
            
            <School
                schoolType={SchoolType.College}
                name={"Evanston Township High School"}
                graduationYear={2023}
                gpa={4}
                activities={["Esports Club Leadership"]}
                major={"Computer Science"}
                minor={"Philosophy"} />
        </div>
    </div>
};
