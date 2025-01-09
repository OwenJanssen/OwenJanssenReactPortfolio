import React from 'react';
import './Hotdogs.css';
import HomeButton from '../HomeButton';

export const Hotdogs = (): React.ReactElement => {
    return <div className="page-container hotdogs">
        <iframe title="VR HOTDOGS" src="https://hotdogs-arvr-a6.glitch.me/"/>
        <HomeButton />
    </div>
}

export default Hotdogs;