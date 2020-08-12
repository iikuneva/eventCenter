import React, { Component } from 'react';
import styles from './index.module.css';



class Input extends Component {
    render() {
        const { name, type = 'text', value, onChange, label } = this.props;
        return (
            <div >
                <label>
                    {label}
                    <input
                        className={styles.input}
                        onChange={onChange}
                        name={name}
                        type={type}
                        value={value} />
                </label>
            </div>
        );
    }
}

export default Input;