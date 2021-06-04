import React from 'react'
import {withAuth0} from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import CardColumns from 'react-bootstrap/CardColumns'
import Carousel from 'react-bootstrap/Carousel'


const PORT = 'http://localhost:3050'
class Profile extends React.Component{
constructor(){
    super(); 
    this.state ={
        trails: '',
        // deleteTrail: '' 
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
            baseURL: PORT,
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

// deleteTrailData = async () => {
// const trail = this.state.deleteTrail;
// let indexHere;
// for (let i = 0; i < this.state.trails.length; i++) {
//     if (trail === this.state.trails[i].name) {
//     indexHere = i;
//     }
// }
// this.props.auth0.getIdTokenClaims()
//     .then(tokenData => {
//     const jwt = tokenData.__raw;
//     const requestConfig = {
//         headers: { "Authorization": `Bearer ${jwt}` },
//         method: 'DELETE',
//         baseURL: process.env.REACT_APP_SERVER,
//         url: `/trail/${indexHere}`
//     }
//     axios(requestConfig)
//         .then(response => {
//         console.log(response.data)

//         })
//         .catch(err => console.error(err));
//     })
// }


render() {
    console.log(this.state.trails)
return(
    <div>
    <Jumbotron style={{background: "url('https://wallpaperaccess.com/full/3051347.jpg') no-repeat" ,backgroundPosition:'center',width:'100%'}}>
        <div style={{marginLeft: "50%"}}>
        <h1 id="h1TagFont">Hello {this.props.userInfo.given_name}, the world is calling.</h1>
        </div>
        <div>
        <Image variant="top" src={this.props.userInfo.picture}  roundedCircle />
        </div>
        <div style={{marginLeft: "45%"}}>
        <Button style={{margin:'10px' }} variant='info' onClick={this.retrieveTrails} > Saved Trails </Button> 
        </div>
    </Jumbotron>

    <CardColumns> 

            {this.state.trails ? this.state.trails.map(item => (
                <Card style={{}}> 
            <Card.Img 
            id="hoveringimage"
            style={{filter: 'brightness(50%)'}}
            width='200px'
            height='200px'
            className='d-block w-100'
            src={item.thumbnail}
            alt={item.name}
            />  
            <Card.ImgOverlay id="cardBodyText">

            <Card.Title style={{color: 'white'}}>{item.name}</Card.Title>
            <Card.Text style={{color:'white'}}>Difficulty Level: {item.difficulty}</Card.Text>
            <Card.Text style={{color: 'white'}}>Rating: {item.rating}</Card.Text>
            {/* <Button variant='danger' onClick={() => this.setState({deleteTrail: item}) , this.deleteTrailData } >Delete</Button>  */}
            {/* <Button variant='danger' onClick={(e) => this.deleteTrailData(e, item)} />  */}
            </Card.ImgOverlay>
            </Card>
            )) : ''}
            </CardColumns>
    <div style={{color: 'white', fontSize: '45pt'}}>
        <Carousel style={{marginTop: '30px'}}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1567697842275-4ba922341b97?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8NGslMjBmb3Jlc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
      alt="Trees"
    />
    <Carousel.Caption>
        <h3>Achieve</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1605472157184-72398dab72e9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8NGslMjBmb3Jlc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
      alt="Forest"
    />
       <Carousel.Caption>
        <h3>Endure</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://besthqwallpapers.com/Uploads/5-1-2021/150522/thumb2-canada-4k-forest-mountains-beautiful-nature.jpg"
      alt="Path"
    />
       <Carousel.Caption>
        <h3>Overcome</h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        </div>
    
        {/* <Button variant='danger' onClick={() => this.deleteTrailData(id)} />   */}

    </div>
);
}
}



export default withAuth0(Profile);