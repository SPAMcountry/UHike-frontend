import React from 'react'; 
import './App.css';
import LocationForm from './LocationForm'; 
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {withAuth0} from '@auth0/auth0-react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import IsLoadingAndError from './IsLoadingAndError';
import Profile from './Profile';
import Footer from './Footer';
import axios from 'axios';
// import Weather from './Weather';

class App extends React.Component {
  // constructor() {
  //   super(); 
  // }
componentDidUpdate = () => {
  if(this.props.auth0.isAuthenticated) { 
    this.props.auth0.getIdTokenClaims()
    .then(res => {
      const jwt = res.__raw;
      const config ={
        headers: {"Authorization" : `Bearer ${jwt}`},
        method: 'post', 
        baseURL: process.env.REACT_APP_SERVER,
        url: '/users'
      }
      axios(config)
        .then(res2 => {
          console.log(res2)
        //   const config2 = {
        //   header: {"Authorization" : `Bearer ${jwt}`},
        //   method: 'get',
        //   baseURL: process.env.REACT_APP_SERVER, 
        //   url: '/trails'
        // }
        // axios(config2)
        // .then(axiosResults => console.log(axiosResults.data))
        // .catch(err => console.error(err)); 
      })
      .catch(err => console.error(err)); 
      
    })
  }
}

render() {
  const { user, isAuthenticated } = this.props.auth0;
  console.log('app', this.props);
  return(
    <>
      <Router>
        <IsLoadingAndError>
          <Header isAuthenticated={isAuthenticated}/>
          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated ? <LocationForm />: null }
            </Route>
            <Route exact path="/profile">
            {this.props.auth0.isAuthenticated ?  <Profile userInfo={user}/>: null }
            </Route>
          </Switch>
          <Footer />
        </IsLoadingAndError>
      </Router>
    </>
  );
}
}

export default withAuth0(App);
