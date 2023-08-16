import '../../css/FormField.css'
import React, { useState } from 'react';

function RemixForm({getRemixCallback}){
    const [maxResults, setMaxResults] = useState(3);

    const updateMaxResults = (val) =>{
        if (val.target.validity.valid){
            setMaxResults(val.target.value);
        } else{
            console.log("invalid");
        }
    }

    function requestRemixes(e){
        e.preventDefault();
        getRemixCallback(maxResults);
    }
    return (
        <>
            <div  className="inputdiv"> 
                <form onSubmit={requestRemixes} className="songformfield remixformfield" >
                    <p style={{width:120, marginTop:5}}>Search Depth:</p><input 
                    type="number"
                    min={1}
                    max={3}
                    pattern="*[0-9]*"
                    value={maxResults}
                    onChange={updateMaxResults}
                    >
                    </input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
        
    );
}

export default RemixForm;