import React, { useState,useEffect  } from 'react';
import Title from './Title';
import { useNavigate, useParams } from 'react-router-dom';
import { routeInfo } from './teacherConnectData';
import { SaveHistory } from './helper';
import StudentSlider from './StudentSlider';

export const LessonPage = ({ data, setData }) => {
    const nav = useNavigate();
    const { lessonId, userClass } = useParams();
    const lesson = data["Lessons"][lessonId];
    const isTeacher = userClass == "teacher";

    const [conceptPopupOpen, setConceptPopupOpen] = useState(false);
    const [questionPopupOpen, setQuestionPopupOpen] = useState(false);
    const [questionText, setQuestionText] = useState('');
    const studentQuestion = 'What is three squared?'
    const [answers, setAnswers] = useState(['', '', '', '']);
    const studentAnswers = ['3', '6', '9', '12']
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const studentCorrectAnswer = 2;

    useEffect(()=>{
        routeInfo.setCurrentRoute({
            name:`${userClass} Lessons`,
            route:`/teacher-connect/${userClass}/lesson/${lessonId}`
        })
    },[])
    const handleTitleChange = (event) => {
        setData(d => {
            let newD = {...d};
            newD["Lessons"][lessonId]["title"] = event.target.value;
            return newD;
        })
    };

    const handleDateChange = (event) => {
        setData(d => {
            let newD = {...d};
            newD["Lessons"][lessonId]["date"] = event.target.value;
            return newD;
        })
    };
      
    const addNewConcept = () => {
        setData(d => {
            let newD = d;
            const index = newD["Concepts"].length;
            newD["Concepts"][index] = {
                "date": "",
                "title": "",
                "explanation": "",
                "resources": [],
                "feedback": [],
            };
            newD["Lessons"][lessonId]["concepts"].push(index);
            return newD;
        });
        nav(`/teacher-connect/teacher/concept/${data["Concepts"].length-1}`);
    };

    const openEditQuestionPopup = () => {
        setQuestionPopupOpen(true);
    };

    const closeEditQuestionPopup = () => {
        setQuestionPopupOpen(false);
    };

    const handleQuestionTextChange = (event) => {
        setQuestionText(event.target.value);
    };

    const handleAnswerChange = (index, event) => {
        const newAnswers = [...answers];
        newAnswers[index] = event.target.value;
        setAnswers(newAnswers);
    };

    const handleCorrectAnswerChange = (index) => {
        setCorrectAnswer(index);
    };

    const handleAddQuestion = () => {
        // Add question logic here
        console.log('Question:', questionText);
        console.log('Answers:', answers);
        console.log('Correct Answer:', correctAnswer);
        // Clear the input fields
        setQuestionText('');
        setAnswers(['', '', '', '']);
        setCorrectAnswer(0);
        // Close the popup
        closeEditQuestionPopup();
    };

    return <div className="lesson-page">
        <Title/>
        {isTeacher ? 
            <>
                <div className="title-text">Lesson Title:</div>
                <textarea className="concept-title" value={lesson["title"]} onChange={handleTitleChange}/>
                <div className="date-text">Date:</div>
                <textarea className="concept-date" value={lesson["date"]} onChange={handleDateChange}/>
            </> :
            <>
                <div className="concept-title">{lesson["title"]}</div>
                <div className="concept-date">{lesson["date"]}</div>
            </>
        }

        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <div className="section">
                <div className="section-text">Concepts</div>
                <div className={isTeacher ? "concepts-section-teacher" : "concepts-section"}>            
                    {lesson["concepts"].map(concept_i => 
                        {
                            return <div style={{flexDirection: "row", display: 'flex'}}>
                                <div className="concept" key={concept_i} onClick={() => SaveHistory(nav,`/teacher-connect/teacher/concept/${concept_i}`)}>
                                    {data["Concepts"][concept_i]["title"]}
                                </div>
                                {isTeacher ?   
                                    <div className="concept" onClick={openEditQuestionPopup}>
                                        Edit Question
                                    </div> : 
                                    <>
                                        <div className="concept" onClick={openEditQuestionPopup}>
                                            View Question
                                        </div>
                                        <div style={{flex: 1, margin: 10}}>
                                            <StudentSlider/>
                                        </div>
                                    </>
                                }
                            </div>
                        }
                    )}
                    {isTeacher && <>
                        <div className="concept" onClick={() => setConceptPopupOpen(p => !p)}>+ Add Existing Concept +</div>
                        <div className="concept" onClick={addNewConcept}>+ Add New Concept +</div>
                    </>}
                </div>
            </div>
            <div className="section">
                <div className="section-text">
                    Notes
                    {isTeacher && <div className="upload-notes">📤</div>}
                </div>
                <img src={"../../../whiteboard.png"}/>
            </div>
        </div>

        {conceptPopupOpen &&
            <>
                <div className="background-blur"/>
                <div className="existing-concept-popup">
                    <div className="popup-header">Add Existing Concept</div>
                    <div className="popup-inner">
                        {data["Concepts"].filter((_, i) => !data["Lessons"][lessonId]["concepts"].includes(i)).map((concept, index) => {
                            return <div className="concept-option" key={index} onClick={() => addExistingConcept(index)}>
                                {concept["title"]}
                            </div>
                        })}
                        {data["Concepts"].filter((_, i) => !data["Lessons"][lessonId]["concepts"].includes(i)).length == 0 &&  
                            <div className="all-concepts-added">
                                All existing concepts have been added.
                            </div>
                        }
                    </div>
                    <div className="popup-footer">
                        <button className="popup-button" onClick={() => setConceptPopupOpen(false)}>Cancel</button>
                    </div>
                </div>
            </>
        }
        {questionPopupOpen &&
            <>
                <div className="background-blur"/>
                <div className="existing-concept-popup">
                    <div className="popup-header">Concept Check</div>
                    <div>Question</div>
                    {isTeacher ? <input value={questionText} onChange={handleQuestionTextChange}/> : <div>{studentQuestion}</div> } 
                    <div className="popup-inner">
                        <div className="answers">
                            {[0, 1, 2, 3].map(i => 
                                <div 
                                    style={{display: "flex", flexDirection: "row", marginBottom: 10}}
                                >
                                    <div style={{width: 100}}>Answer {i+1}:</div>
                                    {isTeacher ? <>
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            checked={correctAnswer === i}
                                            onChange={() => handleCorrectAnswerChange(i)}
                                        />
                                        <input value={answers[i]} onChange={(e) => handleAnswerChange(i, e)}/>
                                    </> : <>
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            checked={correctAnswer === i}
                                            onChange={() => handleCorrectAnswerChange(i)}
                                        />
                                        <div style={{color: correctAnswer === i ? correctAnswer === studentCorrectAnswer ? "green" : "red" : ""}}>{studentAnswers[i]}</div>
                                    </>}
                                    
                                </div>
                            )}
                        </div>
                        {data["Concepts"].filter((_, i) => !data["Lessons"][lessonId]["concepts"].includes(i)).length == 0 &&  
                            <div className="all-concepts-added">
                                All existing concepts have been added.
                            </div>
                        }
                    </div>
                    <div className="popup-footer">
                        <button className="popup-button" onClick={closeEditQuestionPopup}>Cancel</button>
                    </div>
                </div>
            </>
        }
    </div>
};

export default LessonPage;