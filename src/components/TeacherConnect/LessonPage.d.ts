import React from 'react';
import { TeacherConnectData } from './teacherConnectData';

declare const LessonPage = (props: { data: TeacherConnectData, setData: (data: TeacherConnectData) => void}) => React.FC;
export default LessonPage;
