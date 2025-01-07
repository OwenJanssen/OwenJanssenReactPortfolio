import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import { SaveHistory } from './helper';

import StudentLink from './StudentLink';
import {routeInfo} from './teacherConnectData';

// Set the modal styles
const modalStyles = {
    content: {
        width: '300px',
        height: '600px',
        paddingLeft: '100px',
        paddingRight: '100px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: '50px'
    },
};

const ConceptDropdown = ({ concepts }) => {
    const handleConceptChange = (event) => {
        const selectedConcept = event.target.value;
    };

    return <div>
        <label htmlFor="concept-dropdown">Select a Concept:</label>
        <select id="concept-dropdown" onChange={handleConceptChange}>
        <option value="">Select...</option>
        {concepts.map((concept, index) => (
            <option key={index} value={concept.title}>
                {concept.title}
            </option>
        ))}
        </select>
    </div>
}

const ConceptMultiDropdown = ({ concepts }) => {
    const [selectedConcepts, setSelectedConcepts] = useState([]);

    const handleConceptChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedConcepts((prevSelectedConcepts) => [...prevSelectedConcepts, value]);
        } else {
            setSelectedConcepts((prevSelectedConcepts) => prevSelectedConcepts.filter((concept) => concept !== value));
        }
    };

    return (
        <div style={{marginBottom: "1rem"}}>
            <label>Select Concepts:</label>
            {concepts.map((concept, index) => (
                <div key={index}>
                <input
                    type="checkbox"
                    id={`concept-checkbox-${index}`}
                    value={concept.title}
                    checked={selectedConcepts.includes(concept.title)}
                    onChange={handleConceptChange}
                />
                    <label htmlFor={`concept-checkbox-${index}`}>{concept.title}</label>
                </div>
            ))}
        </div>
    );
};

function TeacherPage({ data, setData }) {
    const nav = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gradingType, setGradingType] = useState(0);

    useEffect(()=>{
        // console.log("setting current route")
        routeInfo.setCurrentRoute({route:"/teacher-connect/teacher",name:"Teacher's Home"})
    },[])
    const addLesson = () => {
        setData(d => {
            let newD = d;
            newD["Lessons"][newD["Lessons"].length] = {
                "date": "",
                "content": "",
            };
            return newD;
        });
        SaveHistory(nav,`/teacher-connect/teacher/lesson/${data["Lessons"].length-1}`);
    }

    const addConcept = () => {
        setData(d => {
            let newD = d;
            newD["Concepts"][newD["Concepts"].length] = {
                "date": "",
                "title": "",
                "explanation": "",
                "resources": [],
                "feedback": [],
            };
            return newD;
        });
        SaveHistory(nav,`/teacher-connect/teacher/concept/${data["Concepts"].length-1}`);
    }

    const duplicateConcept = () => {
        return;
    }

    const duplicateLesson = () => {
        return;
    }

    const handleUploadTest = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const handleIndividualGrades = () => {
        setGradingType(0);
    };
    
    const handleSingleGrade = () => {
        setGradingType(1);
    };

    return <div className="teacher-page">
        <Title/>
        <div className="navigation-buttons">
            
            <div className="nav-button" onClick={() => SaveHistory(nav,"/teacher-connect/teacher/groups")}>
                Form Help Groups
            </div>
            <div className="nav-button" onClick={handleUploadTest}>
                Upload Test Results
            </div>
        </div>
        <div className="list-sections">
            <div className="list-section">
                <div className="section-title">
                    Lessons
                    <div className="add-button" onClick={addLesson}>
                        +
                    </div>
                </div>
                <div className="divider"/>
                <div className="list">
                    {data["Lessons"].map((lesson, i) => 
                        <div className="list-item">
                            <div key={i} onClick={() => SaveHistory(nav,`/teacher-connect/teacher/lesson/${i}`)}>
                                {`${lesson["date"]}: ${lesson["title"]}`}
                            </div>
                            <div className="duplicate-button" onClick={duplicateLesson}>
                                Duplicate
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="list-section">
                <div className="section-title">
                    Concepts
                    <div className="add-button" onClick={addConcept}>
                        +
                    </div>
                </div>
                <div className="divider"/>
                <div className="list">
                    {data["Concepts"].map((concept, i) => 
                        <div className="list-item">
                            <div key={i} onClick={() => SaveHistory(nav,`/teacher-connect/teacher/concept/${i}`)}>
                                {`${concept["date"]}: ${concept["title"]}`}
                            </div>
                            <div className="duplicate-button" onClick={duplicateConcept}>
                                Duplicate
                            </div>
                        </div>
                        )}
                </div>
            </div>
            <div className="list-section">
                <div className="section-title">Students</div>
                <div className="divider"/>
                <div className="list">
                    {data["Students"].map(student => <StudentLink userClass="teacher" studentName={student["name"]} key={student["name"]}/>)}
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyles}>
                <h2 style={{justifySelf: "flex-start"}}>Upload Test Results</h2>
                <button>Upload</button>
                <p style={{marginBottom: "-10px"}}>Please select the type of grading:</p>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <button onClick={handleIndividualGrades} style={{backgroundColor: gradingType==0?"green":"", width: 100, margin: 20}}>Individual Question Grades</button>
                    <button onClick={handleSingleGrade} style={{backgroundColor: gradingType==1?"green":"", width: 100, margin: 20}}>Single Test Grade</button>
                </div>
                {gradingType==0 ? 
                    <div>
                        <div className="question-section">
                            Question 1.
                            <ConceptDropdown concepts={data.Concepts}/>
                        </div>
                        <div className="question-section">
                            Question 2.
                            <ConceptDropdown concepts={data.Concepts}/>
                        </div>
                        <div className="question-section">
                            Question 3.
                            <ConceptDropdown concepts={data.Concepts}/>
                        </div>
                        <div className="question-section">
                            Question 4.
                            <ConceptDropdown concepts={data.Concepts}/>
                        </div>
                    </div> : 
                    <ConceptMultiDropdown concepts={data.Concepts}/>
                }
                <button onClick={closeModal}>Done</button>
            </Modal>
        </div>
    </div>
}

export default TeacherPage;
