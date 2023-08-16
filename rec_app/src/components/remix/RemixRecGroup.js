import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import '../../css/App.css';

function RemixRecGroup({recData}){
    
    const renderRecs = (recs)=>{
        return recs.map((rec,idx)=>
            <Button 
            target="_blank" 
            href={rec.url}
            rel="noreferrer"
            className={`${(idx %2 == 0) ? "even-row" : "odd-row"} rec-button`}
            >
            {rec.title}</Button>
        );
    }

    if (recData === null){
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
                {renderRecs(recData.recs)}
            </ButtonGroup>
        </>
    )
}

export default RemixRecGroup;