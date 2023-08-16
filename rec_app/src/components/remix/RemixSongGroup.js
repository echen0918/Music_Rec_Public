import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState, useEffect } from 'react';
import '../../css/App.css';

function RemixSongGroup({songs, updateRemixSongsCallback}){
    const [values, setValues] = useState(null);
    // const [songState, setSongState] = useState(songs);

    useEffect(()=>{
        setValues(null);
    },[songs])
    const updateVals = (vals) => {
        setValues(vals)
        updateRemixSongsCallback(values);

    };
    useEffect(()=>{
        updateRemixSongsCallback(values);
    },[values])
    const renderSongs = (songs)=>{
        return songs.filter(song => song.track != null).map((song,idx)=>
            <ToggleButton 
            className={`${(idx %2 == 0) ? "even-row" : "odd-row"} song-button remix`}
            id={song.track.id}
            key={song.track.id}
            value={song}
            disabled={
                values!=null && values.length ==5 && !values.includes(song)
            }
            >
            {song.track.name}</ToggleButton>
        );
    }

    if (songs === null){
        return (
            <div>
            <h2 className="playlist-header">Selected Playlist Songs:</h2>
            <br></br><h3>[SONGS GO HERE]</h3></div>
            )
        }
    return(
        <>
            <div className="h-12"><h2 className="playlist-header">Selected Playlist Songs:</h2></div>
            <ToggleButtonGroup vertical 
            name="remix-toggles"
            type="checkbox"
            value={values}
            onChange={updateVals}
            className="playlist-button-group h-88">
                {renderSongs(songs)}
            </ToggleButtonGroup>
        </>
    )
}

export default RemixSongGroup;