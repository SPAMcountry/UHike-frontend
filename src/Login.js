import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './Login.css';
import LoginButton from './LoginButton'
import {withAuth0} from '@auth0/auth0-react';


class Login extends React.Component {
  render() {
    return(
      <Card bg='secondary' style={{ marginRight: '40%', width: '18rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Click Below to Log In
          </Card.Text>
          <LoginButton /> 
        </Card.Body>
      </Card>
    )
  }
}

export default withAuth0(Login);