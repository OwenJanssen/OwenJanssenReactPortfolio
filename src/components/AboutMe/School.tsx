import { Tooltip } from "@mui/material";
import React from 'react';

export const SchoolSection = () => {
    const name = "Northwestern University";
    const city = "Evanston";
    const state = "Illinois";
    const startYear = 2019;
    const graduationYear = 2023;
    const gpa = 3.53;
    const degree = "Bachelors of Science";
    const major = "Computer Science";
    const minor = "Philosophy";
    const imageUrl = "https://external-preview.redd.it/3IGW7Pq1ag5KVNsdVi18gacFlNhAZSbH4PQetrs5pvg.jpg?width=960&crop=smart&auto=webp&s=6cfd61e35be519d2f21b1fd77bed7aa39573301c";

    return <div className="about-me-section">
        <div className={"school"}>
            <img className={"school-image"} src={imageUrl} alt={`Image of ${name}`} />

            <div className={"school-header"}>
                <div className={"school-name"}>{name}</div>
                <div className={"location-and-time"}>{city}, {state} : {startYear}-{graduationYear}</div>
            </div>
            <div className={"school-information"}>
                <div className={"student-info"}>
                    <div className={"degree"}>{degree}</div>
                    <div className={"minor"}>GPA: {gpa}</div>
                    <div className={"major"}>Major: {major}</div>
                    <div className={"minor"}>Minor: {minor}</div>
                </div>
                <Tooltip title={"Ranked Top Team in Chicago and Top 9 In The Whole Country"}>
                    <div className={"activities"}>
                        <div>Esports Club Leadership/</div>
                        <div>Overwatch Team Captain</div>
                    </div>            
                </Tooltip>
                {/* TODO: ADD FAVORITE CLASSES */}
            </div>
        </div>
    </div>;
}
