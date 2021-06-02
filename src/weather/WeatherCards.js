import React from 'react';
import Card from 'react-bootstrap/Card';
import '../weather/weatherCard.css'; 



class WeatherCards extends React.Component {
    // constructor() {
    //     super(); 
    }

render() {
    return (
        <div id= "weatherCards">
        <Card style={{width: '400px'}} bg='primary' text='white'> 
            <Card.Body>
            <Card.Title>{this.props.date}</Card.Title>
            <Card.Text>{this.props.description}</Card.Text>
            <img src={`https://www.weatherbit.io/static/img/icons/${this.props.icon}.png`} alt ={'weatherPic'}/>
            </Card.Body> 
        </Card>
        </div>
    )
}
}
export default WeatherCards; 