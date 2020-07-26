import React from 'react';
import {Link} from 'react-router-dom';
import styles from './index.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <span>Event Center</span>
            <Link to="/">Home</Link>
            <Link to="/about">How it works</Link>
            <Link to="/users/login">Login</Link>
            <Link to="/users/logout">Logout</Link>
            <Link to="/users/register">Register</Link>
        </header>
    )
}

export default Header;
