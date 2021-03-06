import axios from 'axios';
import React from 'react'; 
import Carousel from 'react-bootstrap/Carousel'; 
import {withAuth0} from '@auth0/auth0-react';



class TrailCards extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            trail: [],
        }
    }
saveTrail = async (e, item) => {
    e.preventDefault();
    this.props.auth0.getIdTokenClaims() 
    .then(tokenData =>{
        const jwt = tokenData.__raw;
        const requestConfig = {
            headers:{'Authorization': `Bearer ${jwt}`},
            method: 'post',
            baseURL: process.env.REACT_APP_SERVER,
            url: '/trail',
            params: {nameOfTrail: item.name, trailRegion: item.region,
            trailRating: item.rating, trailThumbnail: item.thumbnail}
        }
        axios(requestConfig)
        .then(response => {
            this.setState({trail: response.data}, () => console.log(response.data))
            alert("Saved. Check your profile for saved trails.")
        })
        .catch(err => console.error(err))
    })
    console.log(item);
}
render() {
    return (
        <div>
            <Carousel nextIcon={<span aria-hidden="true" />} prevIcon={<span aria-hidden="true" />} fade> 
            {this.props.trailsData.map(item => (
                item.thumbnail ? 
                <Carousel.Item interval={3000} onClick={(e) => this.saveTrail(e, item)}> 
            <img 
            style={{filter: 'brightness(60%)'}}
            height='600px'
            className='d-block w-100'
            src={item.thumbnail}
            alt={item.name}
            />  
            <Carousel.Caption>
            <h1>{item.name}</h1>
            <h2>{item.difficulty}</h2>
            <h3>{item.rating}</h3>
            </Carousel.Caption>
            
            </Carousel.Item>
            : ''
            ))}
            </Carousel>
        </div>
    )
}
}
export default withAuth0(TrailCards); 

