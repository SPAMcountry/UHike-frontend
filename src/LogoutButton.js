import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return isAuthenticated && (
    <Button variant='info' onClick={logout}>Logout</Button>
  )
}

export default LogoutButton;