import React, { Component } from 'react';
import Input from '../../components/input';
import { register } from '../../rest_api/js/data.js';
import { withRouter } from 'react-router-dom';
import UserContext from '../../Context';


class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeat: '',
            error: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    static contextType = UserContext;

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        const {
            name,
            email,
            password
        } = this.state;

        const result = await register(name, email, password);
        if (!result.success) {
            this.setState({error: result}); //?
            return;
        }

        this.context.logIn(result);

        this.props.history.push('/users/login');
    }

    render() {

        return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <Input
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        label="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label="Password"
                    />
                    <Input
                        name="repeat"
                        type="password"
                        value={this.state.repeat}
                        onChange={this.onChangeHandler}
                        label="Repeat password"
                    />
                    <button>Register</button>
                </form>
            </div>
        );
    }
}

export default withRouter(RegisterPage);