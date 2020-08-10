import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class GuestList extends Component {
    constructor(props) {
        super(props);

        this.setStatusGuest = this.setStatusGuest.bind(this);
    }

    setStatusGuest(guest) {
        let status = 'pending';
        if (guest.is_pending === false && guest.is_attending === true) {
            status = 'confirmed';
        } else if (guest.is_pending === false && guest.is_attending === false) {
            status = 'rejected'
        }
        return status;
    };

    render() {
        let guests = this.props.guests || [];
        // console.log(guests)
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                        {Array.from(guests).map(guest => {
                            return (
                                <Fragment key={guest.objectId}>
                                    <tr>
                                        <td><h4>{guest.name}</h4></td>
                                        <td><h4>{guest.email}</h4></td>
                                        <td><h4>{this.setStatusGuest(guest)}</h4></td>
                                        <td><button onClick={() => this.props.deleteGuestHandler(guest.objectId)}>Delete</button></td>
                                    </tr>
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(GuestList);


