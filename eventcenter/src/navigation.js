import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import HomePage from './pages/home';
import AboutPage from './pages/about';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import CreatePage from './pages/create';
import EventPage from './pages/event';
import ErrorPage from './pages/error';


const Navigation = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/users/register" component={RegisterPage} />
                <Route path="/users/login" component={LoginPage} />
                <Route path="/users/:user_id" component={ProfilePage} />
                <Route path="/data/event" component={CreatePage} />
                <Route path="/data/event/:event_id" component={EventPage} />
                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Navigation;