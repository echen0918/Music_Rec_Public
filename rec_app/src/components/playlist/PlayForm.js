import '../../css/FormField.css'
import React, { useState } from 'react';
import Select from 'react-select';

function PlayForm({getRecsCallback}){

    const genreData= [
          {value: "acoustic", label: "acoustic"},
          {value: "afrobeat", label: "afrobeat"},
          {value: "alt-rock", label: "alt-rock"},
          {value: "alternative", label: "alternative"},
          {value: "ambient", label: "ambient"},
          {value: "anime", label: "anime"},
          {value: "black-metal", label: "black-metal"},
          {value: "bluegrass", label: "bluegrass"},
          {value: "blues", label: "blues"},
          {value: "bossanova", label: "bossanova"},
          {value: "brazil", label: "brazil"},
          {value: "breakbeat", label: "breakbeat"},
          {value: "british", label: "british"},
          {value: "cantopop", label: "cantopop"},
          {value: "chicago-house", label: "chicago-house"},
          {value: "children", label: "children"},
          {value: "chill", label: "chill"},
          {value: "classical", label: "classical"},
          {value: "club", label: "club"},
          {value: "comedy", label: "comedy"},
          {value: "country", label: "country"},
          {value: "dance", label: "dance"},
          {value: "dancehall", label: "dancehall"},
          {value: "death-metal", label: "death-metal"},
          {value: "deep-house", label: "deep-house"},
          {value: "detroit-techno", label: "detroit-techno"},
          {value: "disco", label: "disco"},
          {value: "disney", label: "disney"},
          {value: "drum-and-bass", label: "drum-and-bass"},
          {value: "dub", label: "dub"},
          {value: "dubstep", label: "dubstep"},
          {value: "edm", label: "edm"},
          {value: "electro", label: "electro"},
          {value: "electronic", label: "electronic"},
          {value: "emo", label: "emo"},
          {value: "folk", label: "folk"},
          {value: "forro", label: "forro"},
          {value: "french", label: "french"},
          {value: "funk", label: "funk"},
          {value: "garage", label: "garage"},
          {value: "german", label: "german"},
          {value: "gospel", label: "gospel"},
          {value: "goth", label: "goth"},
          {value: "grindcore", label: "grindcore"},
          {value: "groove", label: "groove"},
          {value: "grunge", label: "grunge"},
          {value: "guitar", label: "guitar"},
          {value: "happy", label: "happy"},
          {value: "hard-rock", label: "hard-rock"},
          {value: "hardcore", label: "hardcore"},
          {value: "hardstyle", label: "hardstyle"},
          {value: "heavy-metal", label: "heavy-metal"},
          {value: "hip-hop", label: "hip-hop"},
          {value: "holidays", label: "holidays"},
          {value: "honky-tonk", label: "honky-tonk"},
          {value: "house", label: "house"},
          {value: "idm", label: "idm"},
          {value: "indian", label: "indian"},
          {value: "indie", label: "indie"},
          {value: "indie-pop", label: "indie-pop"},
          {value: "industrial", label: "industrial"},
          {value: "iranian", label: "iranian"},
          {value: "j-dance", label: "j-dance"},
          {value: "j-idol", label: "j-idol"},
          {value: "j-pop", label: "j-pop"},
          {value: "j-rock", label: "j-rock"},
          {value: "jazz", label: "jazz"},
          {value: "k-pop", label: "k-pop"},
          {value: "kids", label: "kids"},
          {value: "latin", label: "latin"},
          {value: "latino", label: "latino"},
          {value: "malay", label: "malay"},
          {value: "mandopop", label: "mandopop"},
          {value: "metal", label: "metal"},
          {value: "metal-misc", label: "metal-misc"},
          {value: "metalcore", label: "metalcore"},
          {value: "minimal-techno", label: "minimal-techno"},
          {value: "movies", label: "movies"},
          {value: "mpb", label: "mpb"},
          {value: "new-age", label: "new-age"},
          {value: "new-release", label: "new-release"},
          {value: "opera", label: "opera"},
          {value: "pagode", label: "pagode"},
          {value: "party", label: "party"},
          {value: "philippines-opm", label: "philippines-opm"},
          {value: "piano", label: "piano"},
          {value: "pop", label: "pop"},
          {value: "pop-film", label: "pop-film"},
          {value: "post-dubstep", label: "post-dubstep"},
          {value: "power-pop", label: "power-pop"},
          {value: "progressive-house", label: "progressive-house"},
          {value: "psych-rock", label: "psych-rock"},
          {value: "punk", label: "punk"},
          {value: "punk-rock", label: "punk-rock"},
          {value: "r-n-b", label: "r-n-b"},
          {value: "rainy-day", label: "rainy-day"},
          {value: "reggae", label: "reggae"},
          {value: "reggaeton", label: "reggaeton"},
          {value: "road-trip", label: "road-trip"},
          {value: "rock", label: "rock"},
          {value: "rock-n-roll", label: "rock-n-roll"},
          {value: "rockabilly", label: "rockabilly"},
          {value: "romance", label: "romance"},
          {value: "sad", label: "sad"},
          {value: "salsa", label: "salsa"},
          {value: "samba", label: "samba"},
          {value: "sertanejo", label: "sertanejo"},
          {value: "show-tunes", label: "show-tunes"},
          {value: "singer-songwriter", label: "singer-songwriter"},
          {value: "ska", label: "ska"},
          {value: "sleep", label: "sleep"},
          {value: "songwriter", label: "songwriter"},
          {value: "soul", label: "soul"},
          {value: "soundtracks", label: "soundtracks"},
          {value: "spanish", label: "spanish"},
          {value: "study", label: "study"},
          {value: "summer", label: "summer"},
          {value: "swedish", label: "swedish"},
          {value: "synth-pop", label: "synth-pop"},
          {value: "tango", label: "tango"},
          {value: "techno", label: "techno"},
          {value: "trance", label: "trance"},
          {value: "trip-hop", label: "trip-hop"},
          {value: "turkish", label: "turkish"},
          {value: "work-out", label: "work-out"},
          {value: "world-music", label: "world-music"}
        ];
    const [genreSeeds, setGenreSeeds] = useState([]);
    const [limit, setLimit] = useState(10);
    
    function requestRecs(e){
        e.preventDefault();
        // console.log("request recs");
        if (genreSeeds.length === 0){
            console.log("no genres selected");
            return;
        }
        if (genreSeeds.length > 5){
            console.log("too many genres");
            alert(`Recommendation algorithm only supports 5 genres.\nReduce the selection to continue.`)
            return;
        }
        // console.log(genreSeeds);
        var genreString = genreSeeds.join(',');
        const formData = {limit: limit, genreString: genreString}
        getRecsCallback(formData);
        // console.log(genreString);
    }

    const updateSelectedSeeds = (selection) => {
        // setPrevGenreSeeds(genreSeeds);
        var genreArr = [];
        selection.forEach((genre)=>{genreArr.push(genre.value)});
        setGenreSeeds(genreArr);

    }

    const updateLimit = (val) =>{
        if (val.target.validity.valid){
            setLimit(val.target.value);
        } else{
            console.log("invalid");
        }
    }

    return (
        <>
            <div  className="inputdiv"> 
                <form onSubmit={requestRecs} className="songformfield" >
                    <p style={{width:210, marginTop:5}}>Genres:</p><Select className="genreSelect" options={genreData} isMulti onChange={updateSelectedSeeds}/>
                    <p style={{width:250, marginTop:5, marginRight:8}}># of Recs:</p><input 
                    type="number"
                    min={1}
                    max={20}
                    pattern="*[0-9]*"
                    value={limit}
                    onChange={updateLimit}
                    style={{margin:0, marginRight:10}}
                    >
                    </input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
        
    );
}

export default PlayForm;