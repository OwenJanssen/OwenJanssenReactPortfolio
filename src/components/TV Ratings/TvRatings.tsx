import ratings from './TVRatings.json';
import './TvRatings.css'
import '../../App.css'
import React from 'react';

const TVRatings = () : React.ReactElement => {
    console.log(ratings);
    return (
        <div className="page-container">
            <div className="title">TV Ratings</div>
            <div className="tv-card-grid">
                {Object.keys(ratings).map(show => {return (
                    <div className="card">
                        <div className="title"><div className="text">{show}</div></div>
                        <div className="img-container"><img src={ratings[show].image_url} className="img"/></div>
                    </div>
                )})}
            </div>
        </div>
    )
}

export default TVRatings;