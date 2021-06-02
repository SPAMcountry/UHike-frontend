import axios from 'axios';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import WeatherCards from './weather/WeatherCards'; 
import './location.css'
import TrailCards from './trails/trailCards';

const TRAIL_API = process.env.REACT_APP_TRAIL_API
const PORT  = 'http://localhost:3050'
class LocationForm extends React.Component{ 
    constructor() {
        super();
    this.state = {
        data: [],
        weather: [],
        trails: [],
        search: '',
        name: '', 
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
        this.getWeather(); 
        this.getTrail();
        this.getInsta();
    })
    console.log(response, 'this is location response'); 
}
getWeather = async (e) => {
    let response = await axios.get(`${PORT}/weather?lat=${this.state.data.lat}&lon=${this.state.data.lon}`)
        console.log('this is weather response');
        this.setState({weather: response.data});
}
getTrail = async (e) => {
const options = {
    method: 'GET',
    url: 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/',
    params: {lon: this.state.data.lon, lat: this.state.data.lat},
    headers: {
        'x-rapidapi-key': TRAIL_API,
        'x-rapidapi-host': 'trailapi-trailapi.p.rapidapi.com'
    }
    };
    await axios.request(options).then(response => {
        console.log(response.data, 'from trails response')
        this.setState({trails: response.data.data});
    }).catch(function (error) {
        console.error(error);
    });
}
getInsta = async (e) => {
const options = {
    method: 'GET',
    url: 'https://instagram47.p.rapidapi.com/search',
    params: {search: this.state.search},
    headers: {
        'x-rapidapi-key': 'a941993572msh7b32a7b37e6aaa8p1c4490jsn2429594e3684',
        'x-rapidapi-host': 'instagram47.p.rapidapi.com'
    }
    };
    
    axios.request(options).then(response => {
        console.log(response.data, 'this is instagram');
    }).catch(function (error) {
        console.error(error);
    });
}
render() {
console.log(this.state.name, 'this is the state log')
    return(
        
        <div id="formSearchLoc">
        <Form style={{marginTop: '25%'}}>
            <Form.Label style={{color: 'white',fontSize:'70pt'}}>UHike</Form.Label>
            <Form.Control size="large" onChange={(e) => this.setState({search: e.target.value})} placeholder='Search by city' type='text' />
            <Button variant='primary' onClick={this.getLocation}> Search </Button> 
            <Form.Text style={{fontSize:'40pt', color: 'white'}}>
            <div>{this.state.data.display_name ? <div>{this.state.data.display_name}, {this.state.data.lat},{this.state.data.lon}</div> : ''}</div>
            </Form.Text>
            <div>
                <TrailCards styl={{width: '300px'}}trailsData={this.state.trails}/>
            </div>      
            <div>
                {this.state.weather.map(item => { return <WeatherCards icon={item.icon} iconCode={item.iconCode} date={item.date} description ={item.description}/> })}
            </div>       
        </Form>
        </div>
    );
}
}
export default LocationForm; 