import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'
import '../weather/weatherCard.css'; 



class WeatherCards extends React.Component {
    constructor(props) {
        super(props); 
    }

render() {
    return (
        <div id= "weatherCards">
        <CardColumns>
            {this.props.weatherData.map(item => (
            <Card style={{width: '200px', height: '350px'}}bg='dark' text='white'> 
            <Card.Img variant="top" src={`https://www.weatherbit.io/static/img/icons/${item.icon}.png`} alt ={'weatherPic'}/>
            <Card.Body>
            <Card.Title>{item.date}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            </Card.Body> 
        </Card>
            ))}
        </CardColumns>
        
        </div>
    )
}
}
export default WeatherCards; 