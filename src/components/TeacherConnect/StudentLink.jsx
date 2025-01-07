import { useNavigate } from "react-router-dom"
import { SaveHistory } from "./helper";

export const StudentLink = ({ userClass, studentName }) => {
    const nav = useNavigate();

    const goToStudent = () => {
        SaveHistory(nav,`/teacher-connect/${userClass}/${studentName.toLowerCase().replace(/ /g, "-")}`);
    }

    return <div className="student-link" onClick={goToStudent} key={studentName}>
        {studentName}
    </div>;
}

export default StudentLink;