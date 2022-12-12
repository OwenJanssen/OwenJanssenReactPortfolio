import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const HomeButton = () => {
    const goHome = () => {
        window.location.href = `/`; 
    }

    return (
        <Tooltip title="Return To Portfolio" onClick={goHome} >
            <IconButton>
                <HomeIcon sx={{fontSize: '40px'}}/>
            </IconButton>
        </Tooltip>
    )
}

export default HomeButton;