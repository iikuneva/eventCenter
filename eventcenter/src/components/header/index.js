import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import styles from './index.module.css';

class Header extends Component{
    render(){
        // let userid = localStorage.getItem('userid');
        return (
            <header className={styles.header}>
                <Link to="/">Event Center</Link>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">How it works</NavLink>
                <NavLink to="/data/event">Create event</NavLink>
                <NavLink to="/users/profile">My events</NavLink>
                <NavLink to="/users/login">Login</NavLink>
                <NavLink to="/users/logout">Logout</NavLink>
                <NavLink to="/users/register">Register</NavLink>
            </header>
        )
    }
}

export default Header;
