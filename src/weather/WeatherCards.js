import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'
import '../weather/weatherCard.css'; 
import Carousel from 'react-bootstrap/Carousel'


class WeatherCards extends React.Component {
     // constructor() {
     //     super(); 
    // }

render() {
    return (
        
        <Carousel nextIcon={<span aria-hidden="true" />} prevIcon={<span aria-hidden="true" />} style={{marginBottom: '10%', width: '30%'}}>    
            {this.props.weatherData.map(item => (
            <Carousel.Item> 
            <Card style={{marginRight:'120px', width: '250px', height: '370px'}}bg='dark' text='white'> 
            <Card.Img variant="top" src={`https://www.weatherbit.io/static/img/icons/${item.icon}.png`} alt ={'weatherPic'}/>
            <Card.Body>
            <Card.Title>{item.date}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            </Card.Body> 
        </Card>
            </Carousel.Item>
            ))}
        </Carousel>
        
       
    )
}
}
export default WeatherCards; 