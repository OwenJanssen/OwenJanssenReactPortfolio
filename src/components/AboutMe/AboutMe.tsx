import './AboutMe.css'
import '../../App.css'
import { SchoolSection } from './School';
import { MusicSection } from './Music';
import { HobbiesSection } from './Hobbies';
import HomeButton from '../HomeButton';
import { useEffect } from 'react';
import { getAnalytics, logEvent } from "firebase/analytics";

export const AboutMe = () => {
    useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, `entering_about_me`);

        return () => {
            logEvent(analytics, `exiting_about_me`);
        };
    }, []);

    return <div className="page-container about-me">
        <div className="page-title">About Me</div>

        <div className={"page-content"}>
            <div className={"links"}>
                <HomeButton />
                <a href="https://www.linkedin.com/in/owenjanssen/">LinkedIn</a>
                <a href="https://github.com/owenjanssen">GitHub</a>
                <a href="https://www.strava.com/athletes/123919368">Strava</a>
            </div>
            <div className={"sections"}>
                <SchoolSection />
                <MusicSection />
                <HobbiesSection />
            </div>
        </div>
    </div>
};
