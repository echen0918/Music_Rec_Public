import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import '../../css/App.css';

function RecGroup({recs}){
    
    const renderRecs = (tracks)=>{
        return tracks.map((track,idx)=>
            <Button 
            target="_blank" 
            href={track.external_urls.spotify}
            rel="noreferrer"
            className={`${(idx %2 == 0) ? "even-row" : "odd-row"} rec-button`}
            >
            {track.name}</Button>
        );
    }

    if (recs === null){
        return (
            <div>
            <h2 className="playlist-header">Output Recommendations:</h2>
            <br></br><h3>[RECOMMENDATIONS GO HERE]</h3></div>
            )
        }
    return(
        <>
            <div className="h-12"><h2 className="playlist-header">Output Recommendations:</h2></div>
            <ButtonGroup vertical className="playlist-button-group h-88">
                {renderRecs(recs.tracks)}
            </ButtonGroup>
        </>
    )
}

export default RecGroup;