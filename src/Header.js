import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButton from './LogoutButton';
import Login from './Login'
import {withAuth0} from '@auth0/auth0-react'

class Header extends React.Component {
  render() {
    return(
      <Navbar fixed="top" id="navBar" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>UHike</Navbar.Brand>
        <Link style={{margin:'10px'}} to="/">Home</Link>
        <Link style={{margin:'10px'}} to="/profile">Profile</Link>
        {this.props.auth0.isAuthenticated ? <LogoutButton style={{margin:'10px'}} /> : <Login/>}
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
      </Navbar>
    );
  }
}

export default withAuth0(Header);