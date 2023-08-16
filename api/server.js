const express = require('express');
const session = require('cookie-session');
const helmet = require('helmet');
const hpp = require('hpp');
const csurf = require('csurf');
// const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


/* Import config */
dotenv.config({path: path.resolve(__dirname, '.env')});
const PORT = process.env.PORT;

/* Create Express App */
const app = express();

/* Set Security Configs */
app.use(helmet());
app.use(hpp());
// app.use(cors);

/* Set Cookie Settings */
app.use(
    session({
        name: 'session',
        secret: process.env.COOKIE_SECRET,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })
);
app.use(csurf());

/* Set Routes */ 
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const songRoute = require('./routes/song');
const remixRoute = require('./routes/remix');
app.use('/auth', authRoute);

app.use('/user', userRoute);

app.use('/song', songRoute);

app.use('/remix', remixRoute);
app.get('/', (req, res)=> {res.send({"request received!": req.query})}); //`<pre>${JSON.stringify(res.data, null, 2)}</pre>`

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});

module.exports = app;