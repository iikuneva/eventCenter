import React from 'react';

const HomePage = () => {
    return (
        <div className="main">
            <div className="container">
                <div className="info">
                    <h1>EVENT CENTER</h1>
                    <h3>It's free, fast and fancy</h3>
                    <p>Start from here...</p>
                </div>
                <div id="select">
                    <select id="eventtype">
                        <option value="Party">Тype of event</option>
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
            <div id="resent-events">
                <div id="card">

                </div>
            </div>
        </div>
    );

};

export default HomePage;