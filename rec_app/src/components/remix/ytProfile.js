import React from 'react';

import '../../css/Profile.css';

function YTProfile({profile}){
    if (profile === null){
        return (
            <div className = "profile">
                <p>Welcome, </p>
            </div>
        )
    }

    const display_name = profile.display_name;
    const profile_link = profile.external_urls.spotify;
    return (
        <div>
            <div className="profile">
                <p style={{fontSize: "32px"}} >Welcome, <a target="_blank" rel="noreferrer" href={profile_link}>{display_name}</a></p>
                <div className="desc">    
                    This remix/mashup recommender takes songs from your Spotify account and searches for 
                    mashups on YouTube. <br></br>
                    Search Depth specifies how many results in a YT Search to consider for each mashup search; a higher depth may reach less popular results. 
                    <br></br>
                    Choose a playlist and up to 5 songs to get started!<br></br>
                </div>
            </div>
        </div>
    )
}


export default YTProfile;