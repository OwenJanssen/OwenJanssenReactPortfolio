import React, {useState, useEffect} from 'react';
import Title from './Title';
import { useNavigate, useParams } from 'react-router-dom';
import { routeInfo } from './teacherConnectData';
import { SaveHistory } from './helper';

function convertName(name) {
    // Split the name into an array of separate words
    const words = name.split('-');
    
    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
    // Join the capitalized words back together with a space between them
    const result = capitalizedWords.join(' ');
    
    return result;
}

const UnderstandingGraph = ({ concepts, name, userClass, understanding }) => {
    const nav = useNavigate();
    const [selected, setSelected] = useState(4);
    const understandingLevels = Array.from({ length: 5 }, (_, i) => i + 1);
    const understandingCounts = understandingLevels.map(level =>
        concepts.filter(concept => 
            concept.feedback.filter(f => f.name==name)[0][understanding] === level).length
    );
    
    const handleClick = (index) => {
      setSelected(index);
    };

    const goToConcept = (c) => {
        SaveHistory(nav,`/teacher-connect/${userClass}/concept/${c}`);
    };
    
    return <div className="graph-container" style={{marginTop: "2rem"}}>
        <div className="graph">
            {understandingLevels.map((level, index) => (
                <div
                    key={index}
                    className={`bar${selected === index ? ' selected' : ''}`}
                    style={{ height: `${understandingCounts[index] * 30}px` }}
                    onClick={() => handleClick(index)}
                >
                    <div className="label">{level}</div>
                </div>
            ))}
        </div>
        {selected !== null && (
            <div className="students-list">
                {concepts.filter(concept => 
                    concept.feedback.filter(f => f.name==name)[0][understanding] === understandingLevels[selected])
                        .map((concept, index) => (
                            <div key={index} className="concept-link" onClick={()=>goToConcept(index)}>
                                {concept.date}: {concept.title}
                            </div>
                        )
                    )
                }
            </div>
        )}
    </div>
};

function StudentPage({ data }) {
    const { userClass, studentName } = useParams();
    const name = convertName(studentName);
    const nav = useNavigate();

    useEffect(()=>{
        routeInfo.setCurrentRoute({route:`/teacher-connect/${userClass}/${studentName}`,name:`${name}'s Home`})
    },[]);

    const goToLatestLesson = () => {
        SaveHistory(nav,`/teacher-connect/student/lesson/0`);
    };

    const openEmail = () => {

    }

    return <div className="student-page">
        <Title/>
        <div className="student-name">{name}</div>
        {userClass == "student" && 
            <div className="view-latest-lesson-button" onClick={goToLatestLesson}>View Latest Lesson</div>
        }
        {userClass == "parent" && 
            <a href="https://gmail.com">
                <div className="view-latest-lesson-button">Email Teacher</div>
            </a>
        }
        {userClass == "teacher" && 
            <div className="view-latest-lesson-button" onClick={openEmail}>Email Parent</div>
        }
        <div className="instructions">Select a bar in the chart to see the concepts at that level.</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="section">
                <div className="section-text">Self Evaluation</div>
                <div className="feedback-section">
                    <UnderstandingGraph concepts={data.Concepts} name={name} userClass={userClass} understanding={"self-understanding"}/>
                </div>
            </div>
            <div className="section">
                <div className="section-text">Test Results</div>
                <div className="feedback-section">
                    <UnderstandingGraph concepts={data.Concepts} name={name} userClass={userClass} understanding={"test-understanding"}/>
                </div>
            </div>  
        </div>
    </div>
}

export default StudentPage;
