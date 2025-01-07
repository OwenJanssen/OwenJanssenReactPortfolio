import React, { useState } from 'react';
import Title from './Title';
import StudentLink from './StudentLink';

const ConceptMultiDropdown = ({ concepts }) => {
    const [selectedConcepts, setSelectedConcepts] = useState([concepts[0].title]);

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

const FormHelpGroups = ({ data }) => {
    const [balancedGroups, setBalancedGroups] = useState(true);
    const [numGroups, setNumGroups] = useState(4);
    const [groupSize, setGroupSize] = useState(4);

    const handleBalancedGroups = () => {
        setBalancedGroups(true);
    };

    const handleGroupByConcept = () => {
        setBalancedGroups(false);
    };

    const handleNumGroupsChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setNumGroups(value);
    };

    const handleGroupSizeChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setGroupSize(value);
    };

    const groups = {
        "Concepts": [
            {
                "Name": "Converting units",
                "Students": [
                    "Avery Brown",
                    "William Butler",
                    "Chloe Davis",
                    "Lily Mitchell",
                    "Henry Ward",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "Equivalent ratios",
                "Students": [
                    "Jacob Foster",
                    "Madison Griffin",
                    "Jameson Rodriguez",
                    "Sophia Ramirez",
                    "Ava Waston",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "Units of ratios",
                "Students": [
                    "Benjamin Coleman",
                    "Isabella Kim",
                    "Emma Smith",
                    "Mia Turner",
                    "Lucas Wright",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "What is a ratio?",
                "Students": [
                    "Charlotte Bell",
                    "Ethan Green",
                    "Noah Lewis",
                    "Andrew Powell",
                    "Oliver Taylor",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
        ],
        "Lessons": [
            {
                "Name": "Ratio and Proportion",
                "Students": [
                    "Chloe Davis",
                    "Lily Mitchell",
                    "Jameson Rodriguez",
                    "Sophia Ramirez",
                    "Mia Turner",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "Percent",
                "Students": [
                    "Avery Brown",
                    "William Butler",
                    "Isabella Kim",                    
                    "Madison Griffin",
                    "Andrew Powell",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "Decimals",
                "Students": [
                    "Charlotte Bell",
                    "Jacob Foster",
                    "Emma Smith",
                    "Henry Ward",
                    "Lucas Wright",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "Fractions",
                "Students": [
                    "Benjamin Coleman",
                    "Ethan Green",
                    "Noah Lewis",
                    "Oliver Taylor",
                    "Ava Waston",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
        ],
    }

    return <div className="form-help-groups">
        <Title/>
        <div className="buttons">
            <button
                className={`group-by-lesson${balancedGroups ? ' active' : ''}`}
                onClick={handleBalancedGroups}
            >
                Make Balanced Groups
            </button>
            <button
                className={`group-by-concept${!balancedGroups ? ' active' : ''}`}
                onClick={handleGroupByConcept}
            >
                Group By Concept
            </button>
        </div>

        {!balancedGroups && <ConceptMultiDropdown concepts={data.Concepts}/>}
        <div style={{display: "flex", flexDirection: "row", width: "80%", justifyContent: "space-evenly", marginBottom: "1rem"}}>
            <div style={{width: 200}}>
                <label htmlFor="num-groups">Number of Groups: </label>
                <select id="num-groups" value={numGroups} onChange={handleNumGroupsChange}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <option key={num} value={`${num}`}>{num}</option>)}
                </select>
            </div>

            <div style={{width: 200}}>
                <label htmlFor="group-size">Group Size: </label>
                <select id="group-size" value={groupSize} onChange={handleGroupSizeChange}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <option key={num} value={`${num}`}>{num}</option>)}
                </select>
            </div>
        </div>
      
        <div className="groups">
            {groups[balancedGroups ? "Lessons" : "Concepts"].map((group, index) => (
            <div key={index} className="group">
                <div className="group-title">{`Group ${index+1}`}</div>
                <div className="students">
                    {group["Students"].map(s => <StudentLink userClass="teacher" studentName={s}/>)}
                </div>
            </div>
            ))}
        </div>
    </div>;
};

export default FormHelpGroups;
