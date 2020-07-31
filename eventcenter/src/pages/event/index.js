import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { getEventById, deleteEvent } from '../../rest_api/js/data.js';
import images from '../../utils/imgMap.js'
// import GuestsSection from './guestsSection';

class EventPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: false
        };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.onEditHandler = this.onEditHandler.bind(this);
}
    componentDidMount() {
        this.getData();
    }

    async getData() {
        const event = await getEventById(this.props.match.params.eventid);
        // console.log(this.props.match.params.eventid);
        // console.log(event.objectId);
        this.setState({ event });
        // console.log(event);
    }

    async onSubmitHandler(e) {
        e.preventDefault();
    
    }

    atendeeHandler(e){
        this.props.history.push('/users/profile'); 
    }

    async deleteHandler(e){
        await deleteEvent(this.props.match.params.eventid);
        this.setState({ event: false });
        this.props.history.push('/users/profile'); 
    }

    onEditHandler(){
        let eventid = this.props.match.params.eventid;
        this.props.history.push(`/data/event/edit/${eventid}`)
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
                    <h3>Location name: {event.location_name}</h3>
                    <h3>Location address: {event.address}</h3>
                    <h3>Date/time: {event.date_time}</h3>
                    <p>{event.description}</p>
                    <div>
                        <button onClick={this.atendeeHandler}>Atendee List</button>
                        {/* <button onClick={this.editHandler}>Edit</button> */}
                        {/* <Link to={'/data/event/edit/' + this.props.match.params.eventid}>Edit</Link> */}
                        <button onClick={this.onEditHandler}>Edit event</button>
                        <button onClick={this.deleteHandler}>Delete event</button>
                    </div>
                   
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

export default withRouter(EventPage);
