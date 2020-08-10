import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../../components/input'
import { getEventById, deleteEvent, guestConfirmation, getAllGuestsByEventId, guestRejection } from '../../rest_api/js/data.js';
import images from '../../utils/imgMap';
import { joinEvent } from '../../rest_api/js/data';
import UserContext from '../../Context';
import { Link } from 'react-router-dom';


class EventPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: false,
            guestEmail: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.atendeeHandler = this.atendeeHandler.bind(this);
        this.joinListHandler = this.joinListHandler.bind(this);
        this.onJoinHandler = this.onJoinHandler.bind(this);
        this.onConfirmHandler = this.onConfirmHandler.bind(this);
        this.onRejectHandler = this.onRejectHandler.bind(this);

    }

    static contextType = UserContext;

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const event = await getEventById(this.props.match.params.eventid);
        this.setState({ event });
        console.log(event)
    }

    atendeeHandler(e) {
        let eventid = this.props.match.params.eventid;
        this.props.history.push(`/data/event/atendees/${eventid}`);
    }

    joinListHandler(e) {
        let eventid = this.props.match.params.eventid;
        this.props.history.push(`/data/event/joined/${eventid}`);
    }

    async onJoinHandler(e) {
        let eventid = this.props.match.params.eventid;
        await joinEvent(eventid);
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

        let main = <div><Link to="/users/login"><strong>Login</strong> to join event!</Link></div>;

        const event = this.state.event;
        const loggedIn = this.context.user && this.context.user.loggedIn;

        if (loggedIn) {
            if ((this.context.user.objectId === event.ownerId) && event.is_public) {
                main = (
                    <div>
                        <div>
                            <button onClick={this.joinListHandler}>Joined List</button>
                            <button onClick={this.onEditHandler}>Edit event</button>
                            <button onClick={this.deleteHandler}>Delete event</button>
                        </div>
                    </div>
                )
            } else if ((this.context.user.objectId === event.ownerId) && !event.is_public) {
                main = (
                    <div>
                        <div>
                            <button onClick={this.atendeeHandler}>Atendee List</button>
                            <button onClick={this.onEditHandler}>Edit event</button>
                            <button onClick={this.deleteHandler}>Delete event</button>
                        </div>
                    </div>
                )
            } else if ((this.context.user.objectId !== event.ownerId) && event.is_public) {
                if (event.users_id.length < Number(event.max_guests)) {
                    if (!event.users_id.find(u => u.objectId === this.context.user.objectId)) {
                        main = (
                            <div>
                                {/* //след натискане на бутона трябва да се презареди страницата и да покаже already joined */}
                                <button onClick={this.onJoinHandler}>Join</button>
                            </div>
                        )
                    } else {
                        main = (
                            <div>
                                <h3>You have already joined this public event!</h3>
                            </div>
                        )
                    }
                } else {
                    main = (
                        <div>
                            <h3>This public event is fully booked!</h3>
                        </div>
                    )
                }
            }
        } else {
            if (!event.is_public) { //!event.ownerId (!loggedIn && !event.ownerId && !event.is_public)
                main = (
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
                )
            }
        }


        return (
            <div className="container">
                <div className="eventPage">
                    <div>
                        <img alt={event.category} src={event.imageUrl || images[event.category]} />
                    </div>
                    <h1>{event.name}</h1>
                    <h3>Location name: {event.location_name}</h3>
                    <h3>Location address: {event.address}</h3>
                    <h3>Date/time: {(new Date(event.date_time)).toLocaleString()}</h3>
                    <p>{event.description}</p>
                </div>
                {main}
            </div>
        );
    }
}

export default withRouter(EventPage);
