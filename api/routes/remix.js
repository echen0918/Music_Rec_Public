const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const port = process.env.PORT;
const router = express.Router();
const YT_API_KEY = process.env.YT_API_KEY;
function pluck(array, key) {
    return array.map(o => o[key]);
  }
router.get('/', (req, res) => {res.send('remix router')})

router.get('/recs', async (req, res) =>{
  console.log('<------>\nGetting remix reccomendations');

  var {songList, maxResults} = req.query;
  songList = JSON.parse(songList);
  const recList = await getRemixes(songList, maxResults);
  // console.log("reclist: ", recList);
  const result = [];
  for (let i = 0; i < recList.length; i++){
    let url = `https://www.youtube.com/watch?v=${recList[i].videoId}`;
    let item = {url: url, title: recList[i].title};
    if (!pluck(result, "url").includes(url)){
      result.push(item);
    }
  }
  let data = {recs: result};
  res.send(data);
})


async function getRemixes(songList, maxResults){
  const rawRemixList = [];
  var data;
  var searchString;
  var videoId;
  var title;
  // console.log(maxResults);
  for (let i = 0; i < songList.length-1; i++){
    for (let j = i+1; j < songList.length; j++){
      // console.log(songList[i].track.name);
      searchString = songList[i].track.name + " "+ songList[i].track.artists[0].name + " "+ 
                     songList[j].track.name + " "+ songList[j].track.artists[0].name + " mashup";
      // console.log(searchString);
      let {data} = await axios.get(`https://www.googleapis.com/youtube/v3/search`,
        {
          params:{
            part: "snippet",
            key: YT_API_KEY,
            maxResults: maxResults,
            type: "video",
            order:"relevance",
            q: searchString,
          }, 
      }).catch((error)=>{
        console.log(error);
        return "error";
      });
      // console.log(JSON.stringify(data,null,2));
      if (data === null){continue;}
      for (let i = 0; i < data.items.length; i++){
        title = data.items[i].snippet.title;
        videoId = data.items[i].id.videoId;
        let result = {videoId: videoId, title: title};
        rawRemixList.push(result);
      }
    }
  }
  return rawRemixList;
}

async function getVideoData(videos){
  var id_arr = pluck(videos, "videoId");
  var id = id_arr.join(',');
  // console.log(id);
  const response = await axios.get("https://www.googleapis.com/youtube/v3/videos",
  {
    params:{
      key: YT_API_KEY,
      part: "id,snippet,statistics",
      id: id,
    }
  }).catch((error)=>{
    console.log("failed to retrieve videos");
    console.log(error);
    return "error";
  })
  if (response.status !==200){
    return "error";
  }
  return response.data;
}
module.exports= router;