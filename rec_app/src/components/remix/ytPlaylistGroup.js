import React, { useState, useEffect } from "react";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import '../../css/App.css';

function YTPlaylistGroup({playlists,pListCallback}){
    const handleChange = (val) => {
        pListCallback(val);
    }
    const renderPlaylists = (plists) => {
        // console.log(plists);
        return plists.map((p,idx) => 
            <ToggleButton 
            id={`rem-${p.name}`} 
            key={`rem-${p.href}`} 
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
                name="remix-group"
                className="playlist-button-group h-88" 
                onChange={handleChange}>
                {renderPlaylists(playlists.items)}
            </ToggleButtonGroup>
        </>
    )
}

export default YTPlaylistGroup;