import React, { Component } from 'react';
import Input from '../../components/input';
import { createEvent } from '../../rest_api/js/data.js';

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
            is_public: true,
            error: false,
            submitting: false
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
        this.setState({ submitting: true });
        const event = {
            name: this.state.name,
            location_name: this.state.location_name,
            description: this.state.description,
            address: this.state.address,
            category: this.state.category,
            date_time: this.state.date_time,
            is_public: this.state.is_public
        };

        const error = { message: '', errors: {} };
        // if (hotel.description.length < 10) {
        //     error.message = 'Check the form for errors';
        //     error.errors.description = 'Description must be more than 10 symbols.';
        // }
        // if (isNaN(hotel.numberOfRooms) || hotel.numberOfRooms <= 0) {
        //     error.message = 'Check the form for errors';
        //     error.errors.numberOfRooms = 'Number of Rooms must be a positive number';
        // }

        if (error.message) {
            this.setState({ error, submitting: false });
            return;
        }

        this.setState({ error: false });

        const res = await createEvent(event);

        if (!res.success) {
            this.setState({ error: res, submitting: false });
            return;
        }
        this.setState({ submitting: false });
        this.props.history.push('/');
    }

    render() {
        // let errors = null;
        // if (this.state.error) {
        //     errors = (
        //         <div>
        //             <h2 className="errorMessage">{this.state.error.message}</h2>
        //             {Object.keys(this.state.error.errors).map(k => {
        //                 return <p key={k}>{this.state.error.errors[k]}</p>;
        //             })}
        //         </div>
        //     );

        return (
            <div>
                <h1>Create event</h1>
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
                                <option value="sporting Event">Sporting Event</option>
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
                    <input type="submit" value="Create event" disabled={this.state.submitting} />
                </form>
            </div>
        );
    }
}

export default CreatePage;
