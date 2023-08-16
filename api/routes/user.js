const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const url = require('url');
const port = process.env.PORT;
const router = express.Router();
router.get('/', (req, res) => {res.send('user router')})

router.get('/profile', async (req, res) => { 
    console.log('<-------->\nGetting profile data');
    const token_type = 'Bearer';
    // console.log("query: ", req.query);
    const token = req.query.token || null;
    // console.log(token);
    await axios.get('https://api.spotify.com/v1/me', {
        headers: {
        Authorization: `${token_type} ${token}`
        }
    }).then((response)=>{
        res.send(response.data);
    }).catch((error)=>{
        res.send("error");
    })
});

router.get('/playlists', async (req, res) => {
    console.log('<-------->\nGetting playlist data');
    const user_id = req.query.user_id || 'echen';
    const token = req.query.token || null;
    const token_type = 'Bearer';
    axios.get(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        headers: {
            Authorization: `${token_type} ${token}`
        }
    }).then((response)=>{
        console.log("playlist response success");
        res.send(response.data);
    }).catch((error)=>{
        console.log(error);
        res.send("error");
    });
});

module.exports = router;