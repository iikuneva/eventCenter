import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GuestForm from '../../components/guestForm';
import GuestList from '../../components/guestList';
import { getAllGuestsByEventId, getOwnerNameByOwnerId } from '../../rest_api/js/data'
import { createGuest, setEventGuestId, deleteGuest, sendingEmails } from '../../rest_api/js/data.js';


class Atendees extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: false,
            guests: false
        };

        this.deleteGuestHandler = this.deleteGuestHandler.bind(this);
        this.addGuestToList = this.addGuestToList.bind(this);
        this.sendEmails = this.sendEmails.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        let res = await getAllGuestsByEventId(this.props.match.params.eventid);
        let event = await res.json();
        let guests = event.guests_id;
        // console.log(guests)

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

    async sendEmails() {
        let guestsEmails = [...this.state.guests].map(g => g.email);
        let eventid = this.state.event.objectId;
        let eventName = this.state.event.name;
        let ownerName = await getOwnerNameByOwnerId();
        let port = '3000';
        let eventLink = `http://localhost:${port}/data/event/${eventid}`;
       await sendingEmails(guestsEmails, ownerName, eventName, eventLink);
    }


    render() {
        return (
            <div>
                <h1>Atendees List</h1>
                <h2>{this.state.event.name}</h2>
                <h3>{this.state.event.date_time}</h3>
                <GuestForm addGuestToList={this.addGuestToList} />
                <GuestList guests={this.state.guests} deleteGuestHandler={this.deleteGuestHandler} />
                <button onClick={this.sendEmails}>Send invitations</button>
            </div>
        )
    }
}

export default withRouter(Atendees);