import React from 'react'
import {withAuth0} from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import CardGroup from 'react-bootstrap/CardGroup'
import Carousel from 'react-bootstrap/Carousel'

class Profile extends React.Component{
constructor(){
    super(); 
    this.state ={
        trails: '',
        deleteTrail: '' 
    } 
}
    retrieveTrails = async () => {
    if(this.props.auth0.isAuthenticated) {
        this.props.auth0.getIdTokenClaims()
        .then(res => {
        const jwt = res.__raw;

        const config = {
            headers: {"Authorization" : `Bearer ${jwt}`},
            method: 'get',
            baseURL: process.env.REACT_APP_SERVER,
            url: '/trail'
        }
        axios(config)
            .then(response => {
            this.setState({trails: response.data}, () => console.log(response.data))
            })
            .catch(err => console.error(err));
        })
    }
}

deleteTrailData = async () => {
const trail = this.state.deleteTrail;
let indexHere;
for (let i = 0; i < this.state.trails.length; i++) {
    if (trail === this.state.trails[i].name) {
    indexHere = i;
    }
}
this.props.auth0.getIdTokenClaims()
    .then(tokenData => {
    const jwt = tokenData.__raw;
    const requestConfig = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'DELETE',
        baseURL: process.env.REACT_APP_SERVER,
        url: `/trail/${indexHere}`
    }
    axios(requestConfig)
        .then(response => {
        console.log(response.data)

        })
        .catch(err => console.error(err));
    })
}


render() {
    console.log(this.state.trails)
return(
    <div>
    <Jumbotron style={{background: "url('https://www.trip.me/old-wp-content/2013/11/Green-waterfalls.gif')" ,width:'100%'}}>
        <h1>Hello {this.props.userInfo.given_name}, the world is calling.</h1>
        <Image variant="top" src={this.props.userInfo.picture}  />
        <Button style={{margin:'10px' }} variant='info' onClick={this.retrieveTrails} > Saved Trails </Button> 
    </Jumbotron>
    <Carousel fade> 

            {this.state.trails ? this.state.trails.map(item => (
                <Carousel.Item interval={3000}> 
            <img 
            width='300px'
            height='400px'
            className='d-block w-100'
            src={item.thumbnail}
            alt={item.name}
            />  
            <Carousel.Caption>
            <h1>{item.name}</h1>
            <h2>{item.difficulty}</h2>
            <h3>{item.rating}</h3>
            {/* <Button variant='danger' onClick={() => this.setState({deleteTrail: item}) , this.deleteTrailData } >Delete</Button>  */}
            {/* <Button variant='danger' onClick={(e) => this.deleteTrailData(e, item)} />  */}
            </Carousel.Caption>
            </Carousel.Item>
            )) : ''}
            </Carousel>
        {/* <Button variant='danger' onClick={() => this.deleteTrailData(id)} />   */}

    </div>
);
}
}



export default withAuth0(Profile);