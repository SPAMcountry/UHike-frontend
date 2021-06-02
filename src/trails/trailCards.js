import React from 'react'; 
import Carousel from 'react-bootstrap/Carousel'; 



class TrailCards extends React.Component {
    constructor(props) {
        super(props); 
    }

render() {
    return (
        <div id= "trailCards">
            <Carousel fade> 
            {this.props.trailsData.map(item => (
                item.thumbnail ? 
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
            </Carousel.Caption>
            </Carousel.Item>
            : ''
            ))}
            </Carousel>
        </div>
    )
}
}
export default TrailCards; 

