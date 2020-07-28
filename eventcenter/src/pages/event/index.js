import React, { Component } from 'react';
import { getEventById } from '../../rest_api/js/data.js';
import images from '../../utils/imgMap.js'
// import GuestsSection from './guestsSection';

class EventPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: false
        };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
}
    componentDidMount() {
        this.getData();
    }

    async getData() {
        const event = await getEventById(this.props.match.params.id);
        this.setState({ event });
        console.log(event);
    }

    async onSubmitHandler(e) {
        e.preventDefault();
    
    }

    render() {
        let main = <p>Loading &hellip;</p>;
        if (this.state.event) {
            const event = this.state.event;
            main = (
                <div className="eventPage">
                    <div>
                        <img alt={event.category} src={`${images[event.category]}`} />
                    </div>
                    <h1>{event.name}</h1>
                    <h3>Location name: {event.address}</h3>
                    <h3>Location address: {event.address}</h3>
                    <h3>Date/time: {event.date_time}</h3>
                    <p>{event.description}</p>
                    <div>
                        <button onClick={this.onSubmitHandler}>Confirm</button>
                        <button onClick={this.onSubmitHandler}>Reject</button>
                    </div>
                </div>    
            );
        }

        return (
            <div className="container">
                        {/* <h1>Event Page</h1> */}
                        {main}
                        {/* <GuestsSection eventId={Number(this.props.match.params.id)} /> */}
                    </div>
        );
    }
}

export default EventPage;
