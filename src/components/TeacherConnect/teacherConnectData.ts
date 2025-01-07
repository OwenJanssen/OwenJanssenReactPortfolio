export interface TeacherConnectData {
    Lessons: {
        date: string;
        title: string;
        concepts: number[];
    }[];
    Concepts: {
        date: string;
        title: string;
        explanation: string;
        resources: {
            name: string;
            type: string;
            link: string;
        }[];
        feedback: {
            name: string;
            "self-understanding": number;
            "test-understanding": number;
        }[];
    }[];
    Students: {
        name: string;
    }[];
}

export let teacherConnectData: TeacherConnectData = {
    "Lessons": [
        {
            "date": "4/24/2023",
            "title": "Ratio and Proportion",
            "concepts": [
                0,
                1,
                2,
                3
            ]
        },
        {
            "date": "4/17/2023",
            "title": "Percent",
            "concepts": [
                0,
                1,
                2,
                3
            ]
        },
        {
            "date": "4/10/2023",
            "title": "Decimals",
            "concepts": [
                0,
                1,
                2,
                3
            ]
        },
        {
            "date": "4/03/2023",
            "title": "Fractions",
            "concepts": [
                0,
                1,
                2,
                3
            ]
        }
    ],
    "Concepts": [
        {
            "date": "5/7/2023",
            "title": "Basic Statistics",
            "explanation": "Statistics is a branch of mathematics concerned with collecting, analyzing, and interpreting data. It includes descriptive statistics which summarizes data using numerical and graphical methods, and inferential statistics which uses probability theory to make predictions and decisions based on data.",
            "resources": [
                {
                    "name": "Introduction to Statistics",
                    "type": "video",
                    "link": "https://www.youtube.com/watch?v=hs4wDpLqWg4"
                },
                {
                    "name": "Descriptive Statistics Examples",
                    "type": "problem",
                    "link": "https://www.youtube.com/watch?v=WTaFZ-R6zsw"
                },
                {
                    "name": "Inferential Statistics Examples",
                    "type": "problem",
                    "link": "https://www.youtube.com/watch?v=Vf3pLX2z-l4"
                }
            ],
            "feedback": [
                {
                    "name": "Emma Smith",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Oliver Taylor",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Avery Brown",
                    "self-understanding": 3,
                    "test-understanding": 2
                },
                {
                    "name": "Ethan Green",
                    "self-understanding": 1,
                    "test-understanding": 1
                },
                {
                    "name": "Chloe Davis",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Noah Lewis",
                    "self-understanding": 3,
                    "test-understanding": 2
                },
                {
                    "name": "Lily Mitchell",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Lucas Wright",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Mia Turner",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Jacob Foster",
                    "self-understanding": 3,
                    "test-understanding": 2
                },
                {
                    "name": "Sophia Ramirez",
                    "self-understanding": 1,
                    "test-understanding": 1
                },
                {
                    "name": "William Butler",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Ava Watson",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Benjamin Coleman",
                    "self-understanding": 3,
                    "test-understanding": 2
                },
                {
                    "name": "Madison Griffin",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Henry Ward",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Isabella Kim",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Jameson Rodriguez",
                    "self-understanding": 3,
                    "test-understanding": 2
                },
                {
                    "name": "Charlotte Bell",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Andrew Powell",
                    "self-understanding": 1,
                    "test-understanding": 1
                }
            ]
        },
        {
            "date": "5/6/2023",
            "title": "The Pythagorean Theorem",
            "explanation": "The Pythagorean Theorem states that in a right triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides.",
            "resources": [
                {
                    "name": "Proof of the Pythagorean Theorem",
                    "type": "video",
                    "link": "youtube.com"
                },
                {
                    "name": "Solving for the length of the hypotenuse",
                    "type": "problem",
                    "link": "youtube.com"
                },
                {
                    "name": "Solving for the length of a leg",
                    "type": "problem",
                    "link": "youtube.com"
                }
            ],
            "feedback": [
                {
                    "name": "Emma Smith",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Oliver Taylor",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Avery Brown",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Ethan Green",
                    "self-understanding": 1,
                    "test-understanding": 2
                },
                {
                    "name": "Chloe Davis",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Noah Lewis",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Lily Mitchell",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Lucas Wright",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Mia Turner",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Jacob Foster",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Sophia Ramirez",
                    "self-understanding": 1,
                    "test-understanding": 2
                },
                {
                    "name": "William Butler",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Ava Watson",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Benjamin Coleman",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Madison Griffin",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Henry Ward",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Isabella Kim",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Jameson Rodriguez",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Charlotte Bell",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Andrew Powell",
                    "self-understanding": 1,
                    "test-understanding": 2
                }
            ]            
        },
        {
            "date": "5/4/2023",
            "title": "Order of Operations",
            "explanation": "Order of Operations is the rule that tells us which operation to perform first in an expression with more than one operation. The rule is PEMDAS (Parentheses, Exponents, Multiplication and Division, Addition and Subtraction).",
            "resources": [
                {
                    "name": "Order of Operations video tutorial",
                    "type": "video",
                    "link": "youtube.com"
                },
                {
                    "name": "Order of Operations practice problems",
                    "type": "problem",
                    "link": "khanacademy.org"
                },
                {
                    "name": "Order of Operations interactive game",
                    "type": "game",
                    "link": "mathplayground.com"
                }
            ],
            "feedback": [
                {
                    "name": "Emma Smith",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Oliver Taylor",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Avery Brown",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Ethan Green",
                    "self-understanding": 1,
                    "test-understanding": 2
                },
                {
                    "name": "Chloe Davis",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Noah Lewis",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Lily Mitchell",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Lucas Wright",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Mia Turner",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Jacob Foster",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Sophia Ramirez",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "William Butler",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Ava Watson",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Benjamin Coleman",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Madison Griffin",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Henry Ward",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Isabella Kim",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Jameson Rodriguez",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Charlotte Bell",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Andrew Powell",
                    "self-understanding": 1,
                    "test-understanding": 2
                }
            ]            
        },
        {
            "date": "5/3/2023",
            "title": "Simplifying expressions",
            "explanation": "To simplify an expression, we must combine like terms. Like terms have the same variables and the same exponents.",
            "resources": [
                {
                    "name": "How to simplify expressions",
                    "type": "video",
                    "link": "youtube.com"
                },
                {
                    "name": "Simplifying expressions example 1",
                    "type": "problem",
                    "link": "youtube.com"
                },
                {
                    "name": "Simplifying expressions example 2",
                    "type": "problem",
                    "link": "youtube.com"
                }
            ],
            "feedback": [
                {
                    "name": "Emma Smith",
                    "self-understanding": 4,
                    "test-understanding": 4
                },
                {
                    "name": "Oliver Taylor",
                    "self-understanding": 2,
                    "test-understanding": 2
                },
                {
                    "name": "Avery Brown",
                    "self-understanding": 3,
                    "test-understanding": 3
                },
                {
                    "name": "Ethan Green",
                    "self-understanding": 1,
                    "test-understanding": 1
                },
                {
                    "name": "Chloe Davis",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Noah Lewis",
                    "self-understanding": 3,
                    "test-understanding": 3
                },
                {
                    "name": "Lily Mitchell",
                    "self-understanding": 2,
                    "test-understanding": 2
                },
                {
                    "name": "Lucas Wright",
                    "self-understanding": 4,
                    "test-understanding": 4
                },
                {
                    "name": "Mia Turner",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Jacob Foster",
                    "self-understanding": 2,
                    "test-understanding": 2
                },
                {
                    "name": "Sophia Ramirez",
                    "self-understanding": 1,
                    "test-understanding": 1
                },
                {
                    "name": "William Butler",
                    "self-understanding": 4,
                    "test-understanding": 4
                },
                {
                    "name": "Ava Watson",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Benjamin Coleman",
                    "self-understanding": 3,
                    "test-understanding": 3
                },
                {
                    "name": "Madison Griffin",
                    "self-understanding": 2,
                    "test-understanding": 2
                },
                {
                    "name": "Henry Ward",
                    "self-understanding": 4,
                    "test-understanding": 4
                },
                {
                    "name": "Isabella Kim",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Jameson Rodriguez",
                    "self-understanding": 3,
                    "test-understanding": 3
                },
                {
                    "name": "Charlotte Bell",
                    "self-understanding": 2,
                    "test-understanding": 2
                },
                {
                    "name": "Andrew Powell",
                    "self-understanding": 1,
                    "test-understanding": 1
                }
            ]
        },
        {
            "date": "4/27/2023",
            "title": "Converting units",
            "explanation": "To convert between units, we must multiply by ratios of the units to get to our desired result.",
            "resources": [
                {
                    "name": "How to convert units",
                    "type": "video",
                    "link": "youtube.com"
                },
                {
                    "name": "Miles per hour to meters per second",
                    "type": "problem",
                    "link": "youtube.com"
                },
                {
                    "name": "Cups to liters",
                    "type": "problem",
                    "link": "youtube.com"
                }
            ],
            "feedback": [
                {
                    "name": "Emma Smith",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Oliver Taylor",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Avery Brown",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Ethan Green",
                    "self-understanding": 1,
                    "test-understanding": 2
                },
                {
                    "name": "Chloe Davis",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Noah Lewis",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Lily Mitchell",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Lucas Wright",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Mia Turner",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Jacob Foster",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Sophia Ramirez",
                    "self-understanding": 1,
                    "test-understanding": 2
                },
                {
                    "name": "William Butler",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Ava Watson",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Benjamin Coleman",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Madison Griffin",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Henry Ward",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Isabella Kim",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Jameson Rodriguez",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Charlotte Bell",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Andrew Powell",
                    "self-understanding": 1,
                    "test-understanding": 2
                }
            ]            
        },
        {
            "date": "4/26/2023",
            "title": "Equivalent ratios",
            "explanation": "To see if two ratios are equivalent we multiple the numerator of one by the denominator of the other and if these numbers are equal, the ratio is. This is called cross multiplication",
            "resources": [
                {
                    "name": "How to cross multiply",
                    "type": "video",
                    "link": "youtube.com"
                },
                {
                    "name": "Example problem 1",
                    "type": "problem",
                    "link": "youtube.com"
                },
                {
                    "name": "Example problem 2",
                    "type": "problem",
                    "link": "youtube.com"
                }
            ],
            "feedback": [
                {
                    "name": "Emma Smith",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Oliver Taylor",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Avery Brown",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Ethan Green",
                    "self-understanding": 1,
                    "test-understanding": 1
                },
                {
                    "name": "Chloe Davis",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Noah Lewis",
                    "self-understanding": 3,
                    "test-understanding": 2
                },
                {
                    "name": "Lily Mitchell",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Lucas Wright",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Mia Turner",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Jacob Foster",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Sophia Ramirez",
                    "self-understanding": 1,
                    "test-understanding": 1
                },
                {
                    "name": "William Butler",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Ava Watson",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Benjamin Coleman",
                    "self-understanding": 3,
                    "test-understanding": 2
                },
                {
                    "name": "Madison Griffin",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Henry Ward",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Isabella Kim",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Jameson Rodriguez",
                    "self-understanding": 3,
                    "test-understanding": 2
                },
                {
                    "name": "Charlotte Bell",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Andrew Powell",
                    "self-understanding": 1,
                    "test-understanding": 1
                }
            ]
        },
        {
            "date": "4/25/2023",
            "title": "Units of ratios",
            "explanation": "When units are in a ratio, it symbolizes how much of 1 unit is equal to the second unit. For instance miles per hour is a ratio of how many miles can be traveled in an hour.",
            "resources": [
                {
                    "name": "Explanation: units for ratios",
                    "type": "video",
                    "link": "youtube.com"
                },
                {
                    "name": "Example problem 1",
                    "type": "problem",
                    "link": "youtube.com"
                },
                {
                    "name": "Example problem 2",
                    "type": "problem",
                    "link": "youtube.com"
                }
            ],
            "feedback": [
                {
                    "name": "Emma Smith",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Oliver Taylor",
                    "self-understanding": 4,
                    "test-understanding": 4
                },
                {
                    "name": "Avery Brown",
                    "self-understanding": 2,
                    "test-understanding": 2
                },
                {
                    "name": "Ethan Green",
                    "self-understanding": 1,
                    "test-understanding": 1
                },
                {
                    "name": "Chloe Davis",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Noah Lewis",
                    "self-understanding": 3,
                    "test-understanding": 3
                },
                {
                    "name": "Lily Mitchell",
                    "self-understanding": 2,
                    "test-understanding": 2
                },
                {
                    "name": "Lucas Wright",
                    "self-understanding": 4,
                    "test-understanding": 4
                },
                {
                    "name": "Mia Turner",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Jacob Foster",
                    "self-understanding": 2,
                    "test-understanding": 2
                },
                {
                    "name": "Sophia Ramirez",
                    "self-understanding": 1,
                    "test-understanding": 1
                },
                {
                    "name": "William Butler",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Ava Watson",
                    "self-understanding": 4,
                    "test-understanding": 4
                },
                {
                    "name": "Benjamin Coleman",
                    "self-understanding": 3,
                    "test-understanding": 3
                },
                {
                    "name": "Madison Griffin",
                    "self-understanding": 2,
                    "test-understanding": 2
                },
                {
                    "name": "Henry Ward",
                    "self-understanding": 4,
                    "test-understanding": 4
                },
                {
                    "name": "Isabella Kim",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Jameson Rodriguez",
                    "self-understanding": 3,
                    "test-understanding": 3
                },
                {
                    "name": "Charlotte Bell",
                    "self-understanding": 2,
                    "test-understanding": 2
                },
                {
                    "name": "Andrew Powell",
                    "self-understanding": 1,
                    "test-understanding": 1
                }
            ]
        },
        {
            "date": "4/24/2023",
            "title": "What is a ratio?",
            "explanation": "A ratio is a fraction representing how much of the numerator we have compared to the denominator",
            "resources": [
                {
                    "name": "What are ratios?",
                    "type": "video",
                    "link": "youtube.com"
                },
                {
                    "name": "Example problem 1",
                    "type": "problem",
                    "link": "youtube.com"
                },
                {
                    "name": "Example problem 2",
                    "type": "problem",
                    "link": "youtube.com"
                }
            ],
            "feedback": [
                {
                    "name": "Emma Smith",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Oliver Taylor",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Avery Brown",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Ethan Green",
                    "self-understanding": 1,
                    "test-understanding": 2
                },
                {
                    "name": "Chloe Davis",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Noah Lewis",
                    "self-understanding": 3,
                    "test-understanding": 4
                },
                {
                    "name": "Lily Mitchell",
                    "self-understanding": 2,
                    "test-understanding": 1
                },
                {
                    "name": "Lucas Wright",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Mia Turner",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Jacob Foster",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Sophia Ramirez",
                    "self-understanding": 1,
                    "test-understanding": 2
                },
                {
                    "name": "William Butler",
                    "self-understanding": 5,
                    "test-understanding": 4
                },
                {
                    "name": "Ava Watson",
                    "self-understanding": 4,
                    "test-understanding": 5
                },
                {
                    "name": "Benjamin Coleman",
                    "self-understanding": 3,
                    "test-understanding": 2
                },
                {
                    "name": "Madison Griffin",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Henry Ward",
                    "self-understanding": 4,
                    "test-understanding": 3
                },
                {
                    "name": "Isabella Kim",
                    "self-understanding": 5,
                    "test-understanding": 5
                },
                {
                    "name": "Jameson Rodriguez",
                    "self-understanding": 3,
                    "test-understanding": 2
                },
                {
                    "name": "Charlotte Bell",
                    "self-understanding": 2,
                    "test-understanding": 3
                },
                {
                    "name": "Andrew Powell",
                    "self-understanding": 1,
                    "test-understanding": 2
                }
            ]
        },
    ], 
    "Students": [
        {
            "name": "Emma Smith"
        },
        {
            "name": "Oliver Taylor"
        },
        {
            "name": "Avery Brown"
        },
        {
            "name": "Ethan Green"
        },
        {
            "name": "Chloe Davis"
        },
        {
            "name": "Noah Lewis"
        },
        {
            "name": "Lily Mitchell"
        },
        {
            "name": "Lucas Wright"
        },
        {
            "name": "Mia Turner"
        },
        {
            "name": "Jacob Foster"
        },
        {
            "name": "Sophia Ramirez"
        },
        {
            "name": "William Butler"
        },
        {
            "name": "Ava Watson"
        },
        {
            "name": "Benjamin Coleman"
        },
        {
            "name": "Madison Griffin"
        },
        {
            "name": "Henry Ward"
        },
        {
            "name": "Isabella Kim"
        },
        {
            "name": "Jameson Rodriguez"
        },
        {
            "name": "Charlotte Bell"
        },
        {
            "name": "Andrew Powell"
        }
    ]
};

export const routeInfo ={
    stack:[],
    curr:undefined,
    map:new Map(),
    setCurrentRoute:function(data: any){
        //data: route, name 
        // console.log(this)
        this.curr = data   
        this.map.set((this.curr as any).route, true)
    },
    getLastRoute:function(){
        return (this.stack[this.stack.length - 1] as any)?.name ?? "Home";
    }
}