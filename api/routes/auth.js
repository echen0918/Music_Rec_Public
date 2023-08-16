const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {res.send('auth route')});

router.get('/login', (req, res) => {
    console.log('<-------->\nLogging in');
    res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        scope: process.env.SCOPES,
    })}`);
})

router.get('/refresh-token', async (req, res) => {
    console.log('<-------->\nRetrieving refresh token');
    // console.log(req);
    const code = req.query.code || null;
    const refresh_token = req.query.refresh_token || null;
    const clientId = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    const secret = process.env.CLIENT_SECRET;
    const grant_type = 'refresh_token';
    
    const basicHeader = Buffer.from(`${clientId}:${secret}`).toString('base64');
    await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type,
        refresh_token,
    }), {
        headers: {
            Authorization: `Basic ${basicHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((response)=>{
        if (response.status === 200){
            const data = response.data;
            // console.log(data);
            const sessionJWTObject = {
                token: data.access_token,
                token_type: data.token_type,
                code: code,
                redirect_uri: redirect_uri,
                refresh_token: refresh_token,
            };
            // console.log('reached');
            req.session.jwt = jwt.sign(sessionJWTObject, process.env.JWT_SECRET_KEY)
            // console.log("new token: ", sessionJWTObject.token);
            res.redirect('/auth/current-session')
        }
    }).catch((error)=>{
        console.log(error);
        console.log("refresh failed");
        res.send("Refresh_failed");
    });
    
    
});

router.get('/callback', async (req, res) => {
    console.log('<-------->\nLogin callback');
    const {code} = req.query;
    // console.log(code);
    const clientId = process.env.CLIENT_ID;
    const secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
    const grant_type = 'authorization_code';

    const basicHeader = Buffer.from(`${clientId}:${secret}`).toString('base64');
    const {data} = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type,
        code,
        redirect_uri,
    }), {
        headers: {
            Authorization: `Basic ${basicHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    // console.log(data.refresh_token);
    const sessionJWTObject = {
        token: data.access_token,
        token_type: data.token_type,
        code: code,
        redirect_uri: redirect_uri,
        refresh_token: data.refresh_token,
    };
    // console.log("callback token: ", sessionJWTObject.token);
    req.session.jwt = jwt.sign(sessionJWTObject, process.env.JWT_SECRET_KEY)
    return res.redirect('http://localhost:3000/');
});

router.get('/current-session', (req, res) => {
    console.log('<-------->\nCurrent session')
    jwt.verify(req.session.jwt, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err || !decodedToken) {
            res.send(false);
        } else {
            // console.log("current-session token: " , decodedToken);
            res.send(decodedToken);
        }
    });
});

router.get('/logout', (req, res) => {
    console.log('<-------->\nLogging out')
    req.session = null;
    res.redirect('/');
});

module.exports = router;