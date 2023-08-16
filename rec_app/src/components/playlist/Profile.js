import React from 'react';

import '../../css/Profile.css';

function Profile({profile}){
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
                    This playlist recommender finds recommendations from songs
                    across Spotify. <br></br>
                    Links to playlist and recommnended songs are provided.
                    Choose a playlist and up to 5 genres to get started!<br></br>
                </div>
            </div>
        </div>
    )
}


export default Profile;