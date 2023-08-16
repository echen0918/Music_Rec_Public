const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const port = process.env.PORT;
const router = express.Router();
const features = [
    "acousticness", "danceability", "energy",
    "instrumentalness", "liveness", "loudness", "valence",
]
function pluck(array, key) {
    return array.map(o => o[key]);
  }
router.get('/', (req, res) => {res.send('song router')})

router.get('/recs', async (req, res) => {
    console.log('<-------->\nGetting recommendations');
    const {limit} = req.query || 20;
    const {token, playListData, genreString} = req.query || null;
    const token_type = 'Bearer'
    // console.log(playListData);

    const songArr = await getPlayListSongs(playListData.id, token_type, token, playListData.tracks.total);
    if (songArr == "error" || songArr.length == 0){res.send("error");}
    console.log(songArr.length);

    var runningFeatures = {
        acousticness: 0,
        danceability: 0, 
        energy: 0,
        instrumentalness: 0,
        liveness: 0,
        loudness: 0,
        valence: 0,
    };
    // console.log(runningFeatures);
    var songsString;
    var idx = 0;
    const offset = 50;
    var nextIdx = Math.min(idx+offset, songArr.length);
    var count = 0;
    var songFeatures;
    var featArr;
    var featSum; 
    while (idx < songArr.length){

        songsString = songArr.slice(idx, nextIdx).map((s) => {
            if (s.track != null){
                return s.track.id;
            }
        }).join(',').replaceAll(",,", ",");
        // console.log(songsString);
        songFeatures = await getSongFeatures(songsString, token_type, token);
        
        // console.log("outside", songFeatures);
        features.forEach((feature) =>{
            featArr = pluck(songFeatures.audio_features, feature);
            featSum = featArr.reduce((acc, curVal) =>{return acc + curVal}, 0);
            runningFeatures[feature] +=featSum
        });
        count+=songFeatures.audio_features.length;
        idx = nextIdx;
        nextIdx = Math.min(idx+50, songArr.length);
    }
    Object.keys(runningFeatures).forEach((val) => {runningFeatures[val] = Math.round(runningFeatures[val]*1e5/count)/1e5});
    console.log(runningFeatures);
    console.log(`count: ${count}`);
    // }
    await axios.get('https://api.spotify.com/v1/recommendations', 
    {
        params: {
            seed_genres: genreString,
            limit:limit,
            target_acousticness: runningFeatures.acousticness,
            target_danceability: runningFeatures.danceability,
            target_energy: runningFeatures.energy,
            target_instrumentalness: runningFeatures.instrumentalness,
            target_liveness:runningFeatures.liveness,
            target_loudness: runningFeatures.loudness,
            target_valence: runningFeatures.valence,
        },
        headers: {
            Authorization: `${token_type} ${token}`
        }
    }).then((response) => {
        // console.log(response);
        res.send(response.data);
    }).catch((error)=>{
        console.log(error);
        // res.send("error");
    })
    // res.send("success");
})

router.get('/songlist', async (req, res) => {
    console.log('<-------->\nGetting songs from playlist');
    const {token, playListData} = req.query || null;
    const token_type = 'Bearer';
    // console.log(playListData)
    const songArr = await getPlayListSongs(playListData.id, token_type, token, playListData.tracks.total);
    // console.log(songArr);
    res.send(songArr);
})

async function getPlayListSongs(playlist_id, token_type, token, track_total){
    var songArr = [];
    // console.log("get songs func")
    var offset = 0;
    while (offset < track_total){
        await axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, 
        {
            params:{
                fields: "total,items(track(name,external_urls,id,href,artists(name)))",
                offset: offset,
                limit: 100,
            },
            headers: {
                Authorization: `${token_type} ${token}`,
            }
        }).then((response)=>{
            if (response.status == 200){
                songArr=songArr.concat(response.data.items);
            } else{
                return "error";
            }
        }).catch((error)=>{
            // console.log("error", error);
            return "error";
        });
        offset += 100;
    }
    // console.log(songArr.length);
    return songArr;
}

async function getSongFeatures(songids, token_type, token){
    var data;
    const response = await axios.get('https://api.spotify.com/v1/audio-features',
    {
        params: {
            ids: songids
        },
        headers: {
            Authorization: `${token_type} ${token}`
        }
    });
    if (response === undefined || response.data === undefined){return "error";}
    return response.data;
}

module.exports= router;