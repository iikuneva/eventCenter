import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../../components/input'
import { getEventById, deleteEvent, guestConfirmation, getAllGuestsByEventId, guestRejection } from '../../rest_api/js/data.js';
import images from '../../utils/imgMap.js'
// import GuestsSection from './guestsSection';

class EventPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: false,
            guestEmail: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.atendeeHandler = this.atendeeHandler.bind(this);
        this.onConfirmHandler = this.onConfirmHandler.bind(this);
        this.onRejectHandler = this.onRejectHandler.bind(this);
    }
    componentDidMount() {
        this.getData();
    }

    async getData() {
        const event = await getEventById(this.props.match.params.eventid);
        this.setState({ event });
       
    }


    atendeeHandler(e) {
        let eventid = this.props.match.params.eventid;
        this.props.history.push(`/data/event/atendees/${eventid}`);
    }

    async deleteHandler(e) {
        await deleteEvent(this.props.match.params.eventid);
        this.setState({ event: false });
        this.props.history.push('/users/profile');
    }

    onEditHandler() {
        let eventid = this.props.match.params.eventid;
        this.props.history.push(`/data/event/edit/${eventid}`)
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

    }

    async onConfirmHandler() {
        let guestEmail = this.state.guestEmail;
        let eventid = this.props.match.params.eventid;
      
        let data = await getAllGuestsByEventId(eventid);
        let event = await data.json();
        let allGuests = event.guests_id;
        let guest = allGuests.filter(g => g.email === guestEmail);
        let [guestid] = guest.map(o => o.objectId);
        // console.log(guestid);
        await guestConfirmation(guestid);
    }

    async onRejectHandler() {
        let guestEmail = this.state.guestEmail;
        let eventid = this.props.match.params.eventid;
      
        let data = await getAllGuestsByEventId(eventid);
        let event = await data.json();
        let allGuests = event.guests_id;
        let guest = allGuests.filter(g => g.email === guestEmail);
        let [guestid] = guest.map(o => o.objectId);
       await guestRejection(guestid);
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
                        <button onClick={this.onEditHandler}>Edit event</button>
                        <button onClick={this.deleteHandler}>Delete event</button>
                    </div>

                    <div>
                        <form onSubmit={this.onSubmitHandler}>
                        <Input
                            name="guestEmail"
                            value={this.state.guestEmail}
                            onChange={this.onChangeHandler}
                            label="To send response, please type your email here "
                        />
                        <button onClick={this.onConfirmHandler}>Confirm</button>
                        <button onClick={this.onRejectHandler}>Reject</button>
                        </form>
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
