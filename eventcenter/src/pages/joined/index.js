import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import JoinList from '../../components/joinList';
import { getAllJoinedUsersByEventId } from '../../rest_api/js/data';
import styles from './index.module.css';


class JoinedPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: false,
            guests: false
        };

    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        let res = await getAllJoinedUsersByEventId(this.props.match.params.eventid);
        let event = await res.json();
        let guests = event.users_id;
        console.log(event)
        console.log(guests)

        this.setState({
            event,
            guests
        });
    }


    render() {
        return (
            <div className={styles.container}>
                <div>
                    <h1>Join List</h1>
                    <h2>{this.state.event.name}</h2>
                    <h3>{new Date(this.state.event.date_time).toLocaleString()}</h3>
                </div>
                <div>
                    <JoinList guests={this.state.guests} />
                </div>
            </div>
        )
    }
}

export default withRouter(JoinedPage);