import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getEventsByOwnerId } from '../../rest_api/js/data.js';
import EventsList from '../../components/eventsList'

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };

        // this.editEvent = this.editEvent.bind(this);
        // this.deleteEvent = this.deleteEvent.bind(this);
        // this.atendeeList = this.atendeeList.bind(this);
    }
    componentDidMount() {
        this.getData();
        console.log(this.props)
        // console.log(this.props.match)
    }
  
    async getData() {
        const data = await getEventsByOwnerId();
        const events = await data.json();
        const userid = localStorage.getItem('userid');
        this.setState({ events });
    }

    render() {
        return (
            <div>
                <h1>My events</h1>
                {this.state.events.length === 0 ?
                    <p>Loading &hellip;</p> :
                    <EventsList events={this.state.events} />}
            </div>
        );
    }
}


export default withRouter(ProfilePage);