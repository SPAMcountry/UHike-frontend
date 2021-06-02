import axios from 'axios';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from './react-bootstrap/Button'; 
import WeatherCards from './weather/WeatherCards'; 
import './location.css'

const PORT  = 'http://localhost:3050'
class LocationForm extends React.Component{ 
    constructor(props) {
        super(props);
    this.state = {
        data: [],
        weather: [],
        search: '',
        }
    }

// componentDidMount = () => {
//     this.getLocation();
// }     
getLocation = async (e) => {
    let response = await axios.get(`${PORT}/location?search=${this.state.search}`)
    .then(response => {
        this.setState({data: response.data[0]})
        console.log(response.data)
        this.getWeather() 
    })
    console.log(response, 'this is location response'); 
}
getWeather = async (e) => {
    let response = await axios.get(`${PORT}/weather?lat=${this.state.data.lat}&lon=${this.state.data.lon}`)
        console.log('this is weather response');
        this.setState({weather: response.data});
}

render() {
console.log(this.state, 'this is the state log')
    return(
        
        <div id="formSearchLoc">
        <Form style={{marginTop: '25%'}}>
            <Form.Label style={{color: 'white',fontSize:'70pt'}}>UHike</Form.Label>
            <Form.Control size="large" onChange={(e) => this.setState({search: e.target.value})} placeholder='Enter Location' type='text' />
            <Button variant='primary' onClick={this.getLocation}> Get Location </Button> 
            <Form.Text>
            <div>{this.state.data.display_name ? <div>{this.state.data.display_name}, {this.state.data.lat},{this.state.data.lon}</div> : ''}</div>
            </Form.Text>
            <div>
                {this.state.weather.map(item => { return <WeatherCards icon={item.icon} iconCode={item.iconCode} date={item.date} description ={item.description}/> })}
            </div>             
        </Form>
        </div>
    );
}
}
export default LocationForm; 