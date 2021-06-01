import React from 'react'; 
import './App.css';
import LocationForm from './LocationForm'; 
import 'bootstrap/dist/css/bootstrap.min.css';
// import Weather from './Weather';

class App extends React.Component {
  // constructor() {
  //   super(); 
  }


  render()  { 
    return (
      <div className="App">
        <LocationForm /> 
      </div>
    );
  }

}
export default App;
