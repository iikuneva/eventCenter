import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/input';
import { login } from '../../rest_api/js/data.js';
import UserContext from '../../Context';

const LoginPage = () => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(UserContext);
    const history = useHistory();


    const onSubmitHandler = async (e) => {
        e.preventDefault();

       const result = await login(email, password);
        // if (!result.success) {
        //    console.log('Error', result) //?
        //     return;
        // }

        context.logIn(result);
        
        history.push('/');        
    }

        return (
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={onSubmitHandler}>
                    <Input
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        label="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        label="Password"
                    />
                   <button>Login</button>
                </form>
            </div>
        );
    }


export default LoginPage;