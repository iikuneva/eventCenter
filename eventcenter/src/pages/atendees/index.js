import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GuestForm from '../../components/guestForm';
import GuestList from '../../components/guestList';
import { getAllGuestsByEventId } from '../../rest_api/js/data'
import { createGuest, setEventGuestId, deleteGuest } from '../../rest_api/js/data.js';


class Atendees extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: false,
            guests: false
        };

        this.deleteGuestHandler = this.deleteGuestHandler.bind(this);
        this.addGuestToList = this.addGuestToList.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        let res = await getAllGuestsByEventId(this.props.match.params.eventid);
        let event = await res.json();
        let guests = event.guests_id;
      
        this.setState({
                event,
                guests
            });
    }

 async addGuestToList(guest) {
        let resGuest = await createGuest(guest);
        let guestid = resGuest.objectId;
        let eventid = this.props.match.params.eventid;

        await setEventGuestId(guestid, eventid);
        this.getData();
    }

    async deleteGuestHandler(id) {
        await deleteGuest(id);
        this.getData();
        // window.location.reload();
    }


    render() {
        return (
            <div>
                <h1>Atendees List</h1>
                <h2>{this.state.event.name}</h2>
                <h3>{this.state.event.date_time}</h3>
                <GuestForm addGuestToList={this.addGuestToList}/>
                <GuestList guests={this.state.guests} deleteGuestHandler={this.deleteGuestHandler} />
            </div>
        )
    }
}

export default withRouter(Atendees);