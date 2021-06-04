import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import './footer.css'

class Footer extends React.Component {
  render() {
    return(
      <Navbar id="footerBar" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>UHike &copy; Know your hike. Love your hike.</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;