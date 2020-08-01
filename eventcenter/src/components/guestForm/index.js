import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../../components/input';
import { createGuest, setEventGuestId } from '../../rest_api/js/data.js';

class GuestForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
                name: '',
                email: '',
                state: 'panding',
                is_pending: true,
                is_attending: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onGuestAdd = this.onGuestAdd.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onGuestAdd(e) {
        e.preventDefault();
        let guest = {
            name: this.state.name,
            email: this.state.email,
            state: 'panding',
            is_pending: true,
            is_attending: false
        }
        this.props.addGuestToList(guest);
    }

    render() {
        return (
            <form onSubmit={this.onGuestAdd}>
                <Input
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeHandler}
                    label="Name"
                />
                <Input
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeHandler}
                    label="E-mail"
                />
                <button>Add guest</button>
            </form>
        );
    }
}

export default withRouter(GuestForm);