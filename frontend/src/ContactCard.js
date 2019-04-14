import React, { Component } from 'react';
import './App.css';

class ContactCard extends Component {
    render() {
        const { name, email } = this.props;

        return (
            <div className="ContactCard">
                <h4>{name}</h4>
                <p>{email}</p>
            </div>
        );
    }
}

export default ContactCard;
