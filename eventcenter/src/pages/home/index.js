import React, { Component } from 'react';
import { getAllPublicEvents } from '../../rest_api/js/data';
import EventList from '../../components/eventsList';
import Input from '../../components/input'

export class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            searchString: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const data = await getAllPublicEvents();
        const events = await data.json();
        this.setState({ events });
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const {searchString} = this.state;
        console.log(searchString)
        const data = await getAllPublicEvents();
        let allEvents = await data.json();
        
        let events = allEvents.filter(e => e.name.toLowerCase().includes(searchString.toLowerCase()) ||
            e.category.toLowerCase().includes(searchString.toLowerCase()) ||
            e.description.toLowerCase().includes(searchString.toLowerCase()) ||
            e.address.toLowerCase().includes(searchString.toLowerCase()));
        this.setState({ events });
    }

  

    render() {
        return (
            <div className="main" >
                <div className="container">
                    <div className="info">
                        <h1>EVENT CENTER</h1>
                        <h3>It's free, fast and fancy</h3>
                        <p>Start from here...</p>
                    </div>
                    <div id="select">
                        <select id="eventtype">
                            <option>Тype of event</option>
                            <option value="Party">Party</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Festival">Festival</option>
                            <option value="Concert">Concert</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Conference">Conference</option>
                            <option value="Sporting Event or Competition">Sporting Event or Competition</option>
                            <option value="Trip">Trip</option>
                            <option value="Other">Other</option>
                        </select>
                        <div>
                            <button>CREATE</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    <form onSubmit={this.onSubmitHandler}>
                        <Input
                            name="searchString"
                            type="text"
                            value={this.state.search}
                            onChange={this.onChangeHandler}
                            label="Search"
                        />
                        <button>Search public events</button>
                    </form>
                    <EventList events={this.state.events} />

                </div>
            </div>
        );
    }

};

export default HomePage;


// if (product.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
//     product.description.toLowerCase().includes(this.state.search.toLowerCase())) {
//     return (