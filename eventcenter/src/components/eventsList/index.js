import React, { Component } from 'react';
import EventCard from '../eventCard';
import images from '../../utils/imgMap';

class EventsList extends Component {
    render() {
        return (
            <div>
                {this.props.events.map(e => (
                    <EventCard
                        // del={() => this.props.deleteEvent(e.id)}
                        key={e.objectId}
                        eventid={e.objectId}
                        name={e.name}
                        category={e.category}
                        location_name={e.location_name}
                        date_time={e.date_time}
                        imageUrl={e.imageUrl || images[e.category]}
                        /> 
                ))}
            </div>
        );
    }
}

export default EventsList