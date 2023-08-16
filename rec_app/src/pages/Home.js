import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {FaMusic} from 'react-icons/fa';
import PlayForm from "../components/playlist/PlayForm";
import RemixForm from "../components/remix/RemixForm"
import Profile from "../components/playlist/Profile";
import YTProfile from '../components/remix/ytProfile';
import RecGroup from "../components/playlist/RecGroup";
import RemixRecGroup from "../components/remix/RemixRecGroup";
import SongGroup from "../components/playlist/SongGroup";
import RemixSongGroup from "../components/remix/RemixSongGroup";
import axios from 'axios'
import { useEffect, useState, useCallback } from "react";
import PlaylistGroup from "../components/playlist/PlaylistGroup";
import YTPlaylistGroup from "../components/remix/ytPlaylistGroup";
import '../css/Nav.css'
import '../css/Grid.css';
import '../css/Recommendations.css';


function Home( {auth, refreshCallback}) {
  const token = auth.token;
  const refresh_token = auth.refresh_token;
  const code = auth.code;
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [selectedPList, setSelectedPList] = useState(null);
  const [recs, setRecs] = useState(null);
  const [songs, setSongs] = useState(null);

  const [selRemPList, setSelRemPList] = useState(null);
  const [remixSongs, setRemixSongs] = useState(null);
  const [remixSelSongs, setRemixSelSongs] = useState(null);
  const [remixRecs, setRemixRecs] = useState(null);
  // console.log(songs);
  useEffect(() => {
    axios.get('/user/profile',{
      params: {
        token: token,
        refresh_token: refresh_token,
        code: code,
      } 
    }).then((response) => {
      // console.log('response received');
        var {data} = response;
        if (data === "error"){
          refreshCallback(auth)
        }else{
          setProfile(data);
          getPlaylists(data);
        }
    }).catch((error)=>{
      console.log(error);
      console.log("trying refresh");
      refreshCallback(auth);
    })
  }, []);

  const getPlaylists = (profile)=>{
    // console.log('getting playlists');
    axios.get('/user/playlists',{
      params: {
        token: token,
        refresh_token: refresh_token,
        code: code,
        user_id: profile.id,
      } 
    }).then((response) => {
      // console.log('response received');
        var {data} = response;
        if (data === "error"){
          refreshCallback(auth)
        } else{
          setPlaylists(data);
        }
        // console.log(data);
    }).catch((error)=>{
      console.log(error);
      console.log("trying refresh");
      refreshCallback(auth);
    })
  };
  const getRecs = useCallback((formData) =>{
    console.log("getting recs");
    // console.log(formData);
    if (selectedPList === null){
      alert(`No playlist selected.`);
      return;
    }
    // console.log(selectedPList.name);
    if (formData.limit===[]){
      alert(`Please specify a limit.`);
      return;
    }
    axios.get('/song/recs',{
      params:{
        token: token,
        playListData:selectedPList,
        limit: formData.limit,
        genreString: formData.genreString,
      }
    }).then((response)=>{
      console.log(response.status);
      if (response.status !== 200 || response.data === "error"){
        console.log('rec response failed');
        refreshCallback(auth);
      } else{
        // console.log('here');
        // console.log(response.data);
        setRecs(response.data);
      }
    }).catch((error)=>{
      console.log('rec request failed');
      console.log(error);
      refreshCallback(auth);
    })
  },[selectedPList]);

  const updateSPList = useCallback((data) =>{
    // console.log('updating selected playlist: ', data);
    setSelectedPList(data);
    getPListSongs(data);
  },[selectedPList]);

  const getPListSongs = (data) =>{
    if (data == null){
      alert(`No playlist selected.`);
      return;
    }
    // console.log(data);
    axios.get('/song/songlist',
    {
      params:{
        playListData:data,
        token: token,
      }
    }).then((response)=>{
      if(response.status !== 200){
        refreshCallback(auth);
        return;
      }
      setSongs(response.data);
    }).catch((error)=>{
      console.log(`error when retrieving playlist songs`)
      console.log(error);
      // refreshCallback(auth);
    })
  }

  const getRemixPLSongs = (data) =>{
    if (data == null){
      alert(`No playlist selected.`);
      return;
    }
    // console.log(data);
    axios.get('/song/songlist',
    {
      params:{
        playListData:data,
        token: token,
      }
    }).then((response)=>{
      if(response.status !== 200){
        refreshCallback(auth);
        return;
      }
      setRemixSongs(response.data);
    }).catch((error)=>{
      console.log(`error when retrieving playlist songs`)
      console.log(error);
      // refreshCallback(auth);
    })
  }
  const updateRemixSPList = useCallback((data)=>{
    setSelRemPList(data);
    getRemixPLSongs(data);
  },[selRemPList]);
  const getRemixRecs = useCallback((maxResults)=>{
    // console.log(remixSelSongs);
    if (remixSelSongs === null || remixSelSongs.length < 2){
      alert("select at least 2 songs for finding recs")
      return;
    }
    console.log("getting remixes");
    const response = axios.get('/remix/recs',
    {
      params:{
        songList: JSON.stringify(remixSelSongs),
        maxResults: maxResults,
      }
    }).then((response)=>{
      console.log(response.status);
      if (response.status !== 200){
        console.log("remix rec response failed");
        return;
      }
      setRemixRecs(response.data);
      console.log(response.data);
    }).catch((error)=>{
      console.log("remix rec request failed");
      console.log(error);
    })
  },[remixSelSongs]);

  const updateRemixSongsCallback = useCallback((data)=>{
    // console.log(data);
    setRemixSelSongs(data);
  },[remixSelSongs])
  // console.log(remixSelSongs);
  return (
    <>
    <Container className="master-container">
    <Row className="height-content master-row">
        <Col className="xs-12">
        <FaMusic className="logo"></FaMusic>
        <Tabs
            defaultActiveKey="playlist"
        >
          <Tab className="recContentContainer flex-container" eventKey="playlist" title="Playlist">
            <Container className="masterRowContainer">
            <Row className="halfPageRow topPlaylist">
              <Col className="sm-12">
                <div className="formdiv">
                <h1 id="formtitle">Spotify Playlist Recommender</h1>
                <div className="text-center" id="explain">
                  <Profile profile={profile}></Profile>
                </div>
                <PlayForm getRecsCallback={getRecs}></PlayForm>
                </div>
              </Col>
            </Row>
            <Row className="halfPageRow bottomPlaylist">

            <Col className="sm-12 text-center w-100 h-100">
              
              <Container className="playlist-container">
                <Row className="h-100">
                  <Col className="playlist-col sm-4">
                    <PlaylistGroup playlists={playlists} pListCallback={updateSPList}></PlaylistGroup>
                  </Col>
                  <Col className="playlist-col sm-4">
                    <SongGroup songs={songs}></SongGroup>
                  </Col>
                  <Col className="playlist-col sm-4">
                    <RecGroup recs={recs}></RecGroup>
                  </Col>
                </Row>
              </Container>
              
              </Col>
            </Row>
            </Container>
          </Tab>
          <Tab eventKey="remix" title="Remix">
          <Container className="masterRowContainer">
            <Row className="halfPageRow topPlaylist">
              <Col className="sm-12">
                <div className="formdiv">
                <h1 id="formtitle">Remix Song Recommender</h1>
                <div className="text-center" id="explain">
                  <YTProfile profile={profile}></YTProfile>
                </div>
                <RemixForm getRemixCallback={getRemixRecs}></RemixForm>
                </div>
              </Col>
            </Row>
            <Row className="halfPageRow bottomPlaylist">

            <Col className="sm-12 text-center w-100 h-100">
              
              <Container className="playlist-container">
                <Row className="h-100">
                  <Col className="playlist-col sm-4">
                    <YTPlaylistGroup playlists={playlists} pListCallback={updateRemixSPList} ></YTPlaylistGroup>
                  </Col>
                  <Col className="playlist-col sm-4">
                    <RemixSongGroup songs={remixSongs} updateRemixSongsCallback={updateRemixSongsCallback}></RemixSongGroup>
                  </Col>
                  <Col className="playlist-col sm-4">
                    <RemixRecGroup recData={remixRecs}></RemixRecGroup>
                  </Col>
                </Row>
              </Container>
              
              </Col>
            </Row>
            </Container>
          </Tab>
        </Tabs>
      </Col>
    </Row>
    <a className="logout-button" href="/auth/logout"><button>Log Out</button></a>
    </Container>
    </>
  );
  // }
  // return <p>Test</p>
}

export default Home;
