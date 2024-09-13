import React from 'react';

export enum SchoolType {
    HighSchool,
    College
}

export type SchoolProps =  {
    schoolType: SchoolType,
    name: string,
    graduationYear: number,
    gpa: number,
    activities: string[]
    major?: string,
    minor?: string
}

export const School = (props: SchoolProps) => {
    const { schoolType, name, graduationYear, gpa, activities, major, minor } = props;

    return (
        <div>
            <h2>{schoolType === SchoolType.HighSchool? 'High School' : 'College'}</h2>
            <h3>{name}</h3>
            <p>Graduation Year: {graduationYear}</p>
            <p>GPA: {gpa}</p>
            <p>Activities: {activities.join(', ')}</p>
            {major && <p>Major: {major}</p>}
            {minor && <p>Minor: {minor}</p>}
        </div>
    );
}
