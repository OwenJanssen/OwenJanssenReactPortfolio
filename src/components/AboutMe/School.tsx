import { Tooltip } from "@mui/material";
import React from 'react';

export const SchoolSection = () => {
    const imageUrl = "https://external-preview.redd.it/3IGW7Pq1ag5KVNsdVi18gacFlNhAZSbH4PQetrs5pvg.jpg?width=960&crop=smart&auto=webp&s=6cfd61e35be519d2f21b1fd77bed7aa39573301c";

    return <div className="about-me-section">
        <div className={"school"}>
            <img className={"school-image"} src={imageUrl} alt={`Image of Northwestern University`} />

            <div className={"school-header"}>
                <div className={"school-name"}>Evanston Township High School</div>
                <div className={"location-and-time"}>Evanston, Illinois : 2015-2019</div>
                <div className={"school-name"}>Northwestern University</div>
                <div className={"location-and-time"}>Evanston, Illinois : 2019-2023</div>
            </div>
            <div className={"school-information"}>
                <div className={"student-info"}>
                    <div className={"degree"}>Bachelors of Science</div>
                    <div className={"minor"}>GPA: 3.53</div>
                    <div className={"major"}>Major: Computer Science</div>
                    <div className={"minor"}>Minor: Philosophy</div>
                </div>
                <Tooltip title={"Ranked Top Team in Chicago and Top 9 In The Whole Country"}>
                    <div className={"activities"}>
                        <div>Esports Club Leadership/</div>
                        <div>Overwatch Team Captain</div>
                    </div>            
                </Tooltip>
                <div className={"favorite-classes"}>
                    <div className={"title"}>Favorite Classes</div>
                    <div className={"classes-section"}>
                        <div className={"section"}>
                            <div className={"section-title"}>Computer Science</div>
                            <div className={"class"}>Data Structures and Algorithms</div>
                            <div className={"class"}>Artificial Intelligence in Participatory Narratives</div>
                            <div className={"class"}>Rapid Prototyping for Software Development</div>
                            <div className={"class"}>Human Computer Interaction Studio</div>
                        </div>
                        <div className={"section"}>
                            <div className={"section-title"}>Philosophy</div>
                            <div className={"class"}>Introduction to Existentialism</div>
                            <div className={"class"}>French Existentialism</div>
                            <div className={"class"}>Studies in German Philosophy: Hegel</div>
                            <div className={"class"}>Philosophy of Humor</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
