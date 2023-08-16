import React from 'react';
import axios from 'axios';
import {useState, useEffect, useCallback} from 'react';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Login from './pages/Login';
// import './css/Nav.css'
function App() {

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get('/auth/current-session').then((response)=>{
      const data = response.data;
      setAuth(data);
      // console.log("old token: ", data.token);
    })
  }, []);

  const refreshCallback = useCallback((data)=>{
    console.log("refersh callback triggered");
    axios.get('/auth/refresh-token', {
      params:{
        token: data.token,
        refresh_token: data.refresh_token,
        code: data.code,
      }
    }).then((response)=>{
      console.log("refresh response recieved");
      const newData = response.data;
      setAuth(newData);
      // console.log("new token: ", newData.token);
      window.location.reload();
    }).catch((err)=>{
      console.log("refresh req failed");
      console.log(err);
    });
  },[auth]);
  
  if (auth === null) {
    return <Loading></Loading>
  }
  if (auth) {
    return (
      // <p>dev</p>
      <Home auth={auth} refreshCallback={refreshCallback}></Home>
    )
  }

  return <Login></Login>
}
function Fallback() {
  return (<p>Something went wrong</p>)
}
  export default App;