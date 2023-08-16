import React, { useState, useEffect } from "react";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import '../../css/App.css';

function PlaylistGroup({playlists,pListCallback}){
    
    const handleChange = (val) => {
        // console.log("change called: ",val);

        pListCallback(val);
    }
    const renderPlaylists = (plists) => {
        // console.log(plists);
        return plists.map((p,idx) => 
            <ToggleButton 
            id={p.name} 
            key={p.id} 
            value={p} 
            className={`${(idx %2 == 0) ? "even-row" : "odd-row"} playlist-button`} 
            style={{zIndex:0}}
            >{p.name} </ToggleButton>
        );
    }
    if (playlists === null){
        return (
            <div>loading...</div>
            )
        }

    return(
        <>
            <div className="h-12"><h2 className="playlist-header">Playlists</h2></div>
            <ToggleButtonGroup vertical 
                type="radio"
                name="playlist-group"
                className="playlist-button-group h-88" 
                onChange={handleChange}>
                {renderPlaylists(playlists.items)}
            </ToggleButtonGroup>
        </>
    )
}

export default PlaylistGroup;