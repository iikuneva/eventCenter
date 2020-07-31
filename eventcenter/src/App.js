import React, { Component } from 'react';
import {
  withRouter,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import CreatePage from './pages/create';
import EditPage from './pages/edit';
import EventPage from './pages/event';
import ErrorPage from './pages/error';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/users/register" component={RegisterPage} />
          <Route path="/users/login" component={LoginPage} />
          <Route path="/users/profile" component={ProfilePage} />
          <Route path="/data/event/:eventid" exact component={EventPage} />
          <Route path="/data/event" exact component={CreatePage} />
          <Route path="/data/event/edit/:eventid" exact component={EditPage} />
          <Route component={ErrorPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}


export default withRouter(App);
