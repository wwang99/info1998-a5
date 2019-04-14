import React, { Component } from 'react';
import './App.css';

class ContactCardAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: '',
            emailValue: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleNameChange = event => {
        this.setState({ nameValue: event.target.value });
    }

    handleEmailChange = event => {
        this.setState({ emailValue: event.target.value });
    }

    handleSubmit = async event => {
        await fetch(`/api/add-contact-card`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.nameValue, email: this.state.emailValue })
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Name</h3>
                <input className="InputBox" type="text" onChange={this.handleNameChange} />
                <h3>Email</h3>
                <input className="InputBox" type="text" onChange={this.handleEmailChange} />
                <button type="submit" className="Button">Submit</button>
            </form>
        );
    }
}

export default ContactCardAdder;
