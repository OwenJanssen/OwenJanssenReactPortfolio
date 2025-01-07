import React from 'react';
import { TeacherConnectData } from './teacherConnectData';

declare const TeacherPage = (props: { data: TeacherConnectData, setData: (data: TeacherConnectData) => void}) => React.FC;
export default TeacherPage;
