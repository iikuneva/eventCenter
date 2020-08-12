import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import images from '../../utils/imgMap.js'

function EventCard({ eventid, name, category, location_name, date_time, imageUrl }) {
    return (
        <article className={styles.eventCard}>
            <img alt={category} src={`${imageUrl}` || `${images[category]}`} />
            <div>
                <h1>{name}</h1>
                <h3>Location name: {location_name}</h3>
                <h3>Date/time: {(new Date(date_time)).toLocaleString()}</h3>
            </div>
            <div className={styles.linkContainer}>
                <Link className={styles.link} to={'/data/event/' + eventid}>View Details</Link>
            </div>
            {/* {canDelete && <a href="javascript:void(0)" onClick={del}>Delete</a>} */}
        </article>
    );
}

export default EventCard;