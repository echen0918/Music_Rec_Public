import React from 'react';
import '../css/App.css';
import '../css/Login.css';

function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Song Recommender</h1>
                <p>
                    You are not logged in to Spotify
                </p>
                <a
                    className="App-link"
                    href={"/auth/login"}
                >
                    Login Here
                </a>
            </header>
        </div>
    );
}

export default Login;