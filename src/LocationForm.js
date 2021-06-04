import axios from 'axios';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import WeatherCards from './weather/WeatherCards'; 
import './location.css'
import TrailCards from './trails/trailCards';
import Carousel from 'react-bootstrap/Carousel'
console.log(process.env.REACT_APP_TRAIL_API);

const TRAIL_API = process.env.REACT_APP_TRAIL_API
const PORT  = process.env.REACT_APP_SERVER
class LocationForm extends React.Component{ 
    constructor(props) {
        super(props);
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
        // this.getInsta();
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
    console.log(options);
    await axios.request(options).then(response => {
        console.log(response.data, 'from trails response')
        this.setState({trails: response.data.data});
    }).catch(function (error) {
        console.error(error);
    });
}


// getInsta = async (e) => {
// const options = {
//     method: 'GET',
//     url: 'https://instagram47.p.rapidapi.com/search',
//     params: {search: this.state.search},
//     headers: {
//         'x-rapidapi-key': 'a941993572msh7b32a7b37e6aaa8p1c4490jsn2429594e3684',
//         'x-rapidapi-host': 'instagram47.p.rapidapi.com'
//     }
//     };
    
//     axios.request(options).then(response => {
//         console.log(response.data, 'this is instagram');
//     }).catch(function (error) {
//         console.error(error);
//     });
// }
render() {
console.log(this.state, 'this is the state log')
    return(
        
        <div  id="formSearchLoc">
        <Form >
            <Form.Label style={{marginTop: '10%', marginLeft:'40%',color: 'white',fontSize:'80pt'}}>UHike</Form.Label>
            <Form.Control style={{width: '80%', marginLeft: '10%'}} onChange={(e) => this.setState({search: e.target.value})} placeholder='Search by city' type='text' />
            <Button style={{marginLeft:'45%', marginTop:'10px'}} variant='primary' onClick={this.getLocation}> Search </Button> 
            <Form.Text style={{fontSize:'40pt', color: 'white'}}>
            <div style={{marginLeft: '10%'}}>{this.state.data.display_name ? <div>{this.state.data.display_name}, {this.state.data.lat},{this.state.data.lon}</div> : ''}</div>
            </Form.Text>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <WeatherCards style={{margin:'0', padding: '0'}} weatherData={this.state.weather}/> 
            </div>       
            <div>
                <TrailCards trailsData={this.state.trails}/>
            </div>      
        </Form>
        <div style={{color: 'white', fontSize: '45pt'}}>
        <Carousel style={{marginTop: '30px'}}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://wallpapercave.com/wp/wp4853028.jpg"
      alt="Mountain View"
    />
    <Carousel.Caption>
        <h3>Achieve</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://wallpapercave.com/wp/wp5727862.jpg"
      alt="Forest"
    />
       <Carousel.Caption>
        <h3>Endure</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://wallpapercave.com/wp/wp5209675.jpg"
      alt="Path"
    />
       <Carousel.Caption>
        <h3>Overcome</h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        </div>
        </div>
    );
}
}
export default LocationForm; 