import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import '../../css/App.css';

function SongGroup({songs}){
    
    const renderSongs = (songs)=>{
        return songs.filter(song => song.track != null).map((song, idx)=>
            <Button 
            target="_blank" 
            href={song.track.external_urls.spotify}
            key={song.track.id}
            rel="noreferrer"
            className={`${(idx %2 == 0) ? "even-row" : "odd-row"} song-button `}
            >
            {song.track.name}</Button>
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
            <ButtonGroup vertical className="playlist-button-group h-88">
                {renderSongs(songs)}
            </ButtonGroup>
        </>
    )
}

export default SongGroup;