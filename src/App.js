import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Button';

import LocationForm from './LocationForm';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
  }
}

render() {
  return (
    <div className="App">
      <LocationForm />
    </div>
  )
}

export default App;
