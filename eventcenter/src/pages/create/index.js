import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../../components/input';
import { createEvent } from '../../rest_api/js/data.js';
import styles from './index.module.css';


class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            location_name: '',
            address: '',
            category: '',
            date_time: '',
            imageUrl: '',
            max_guests: 0,
            is_public: true,
            error: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onRadioHandler = this.onRadioHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onRadioHandler(e) {
        const is_public = e.target.value === 'true' ? true : false;
        this.setState({ is_public });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        const event = {
            name: this.state.name,
            location_name: this.state.location_name,
            description: this.state.description,
            address: this.state.address,
            category: this.state.category || 'party',
            date_time: (new Date(this.state.date_time) || (Date.now())),
            imageUrl: this.state.imageUrl,
            max_guests: Number(this.state.max_guests),
            is_public: this.state.is_public || true,
        };
        console.log(event);

        try {
            if (event.name.length === 0) {
                this.setState({
                    error: { message: "Event name is required!" }
                });
                return;
            }
            if (event.description.length === 0) {
                this.setState({
                    error: { message: 'Event description is required!' }
                });
                return;
            }
            if (event.location_name.length === 0 || event.address.length === 0) {
                this.setState({
                    error: { message: 'Location name and address are required!' }
                });
                return;
            }
            if (event.date_time <= (Date.now())) {
                this.setState({
                    error: { message: 'Date must be in the future!'}
                });
                return;
            }

            const res = await createEvent(event);
            if (res.hasOwnProperty('errorData')) {
                this.setState({
                    error: { message: res.message }
                })
                return;
            }

            let eventid = res.objectId;
            this.props.history.push(`/data/event/${eventid}`);

        } catch (e) {
            console.error(e);
            this.setState({
                error: { message: e.message }
            })
        }

    }

    render() {
        let errors = null;
        if (this.state.error) {
            errors = (
                <div className={styles.errorMessage}>
                    <p>{this.state.error.message}</p>
                </div>
            );
        }

        return (
            <div>
                <h1>Create event</h1>
                {errors}
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name='name'
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label='Event name'
                    />
                    <div>
                        <label> Event Type
                        <select name="category" value={this.state.category} onChange={this.onChangeHandler}>
                                <option value="party">Тype of event</option>
                                <option value="party">Party</option>
                                <option value="birthday">Birthday</option>
                                <option value="wedding">Wedding</option>
                                <option value="reunion">Reunion</option>
                                <option value="festival">Festival</option>
                                <option value="concert">Concert</option>
                                <option value="seminar">Seminar</option>
                                <option value="conference">Conference</option>
                                <option value="sport">Sporting Event</option>
                                <option value="trip">Trip</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                    </div>
                    <Input
                        name="description"
                        value={this.state.description}
                        onChange={this.onChangeHandler}
                        label="Description"
                    />
                    <Input
                        name="location_name"
                        value={this.state.location_name}
                        onChange={this.onChangeHandler}
                        label="Location name"
                    />
                    <Input
                        name="address"
                        value={this.state.address}
                        onChange={this.onChangeHandler}
                        label="Location address"
                    />

                    <Input
                        name="date_time"
                        value={this.state.date_time}
                        type="datetime-local"
                        onChange={this.onChangeHandler}
                        label="Date/Time"
                    />
                    <Input
                        name="imageUrl"
                        value={this.state.imageUrl}
                        type="text"
                        onChange={this.onChangeHandler}
                        label="ImageUrl"
                    />
                    <Input
                        name="max_guests"
                        value={Number(this.state.max_guests)}
                        type="number"
                        onChange={this.onChangeHandler}
                        label="Maximum guests"
                    />
                    <div>
                        <label>Public or private event?
                            <Input
                                name="is_public"
                                type="radio"
                                value={true}
                                checked={this.state.is_public === true}
                                onChange={this.onRadioHandler}
                                label="Public - Anyone can see it."
                            />
                            <Input
                                name="is_public"
                                type="radio"
                                value={false}
                                checked={this.state.is_public === false}
                                onChange={this.onRadioHandler}
                                label="Private - Only people who have a link can see it."
                            />
                        </label>
                    </div>
                    <button>Create</button>
                </form>
            </div>
        );
    }
}

export default withRouter(CreatePage);
