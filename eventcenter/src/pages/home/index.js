import React, { Component } from 'react';
import { getAllPublicEvents } from '../../rest_api/js/data';
import EventsList from '../../components/eventsList';
import Input from '../../components/input';
import { Link } from 'react-router-dom';


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
        let events = await getAllPublicEvents();
        events.sort((a, b) => b.date_time - a.date_time);
        events = events.slice(0, 5);
        this.setState({ events });
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const { searchString } = this.state;
        const allEvents = await getAllPublicEvents();

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
                            {/* <button>CREATE</button> */}
                             <Link to={'/data/event'}>CREATE</Link>
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
                    <div>
                        <h1>Public events</h1>
                        {this.state.events.length === 0 ?
                            <p>There are no events &hellip;</p> :
                            <EventsList events={this.state.events} />}
                    </div>
                </div>
            </div>
        );
    }

};

export default HomePage;


// if (product.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
//     product.description.toLowerCase().includes(this.state.search.toLowerCase())) {
//     return (