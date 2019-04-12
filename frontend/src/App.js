import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            data: [],
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

    componentDidMount = async () => {
        let response = await fetch('/api/contact-cards');
        let responseJSON = await response.json();
        this.setState({ fetched: true, data: responseJSON })
    }

    render() {
        const { fetched, data } = this.state;

        return (
            <div className="App">
                <h1>Contact Cards</h1>
                <div className="ContactCardsContainer">
                    {
                        fetched ? (data.length !== 0 ? data.map(elt => <div className="ContactCard"><h4>{elt.name}</h4><p>{elt.email}</p></div>) : <p>No contact cards</p>) : <p>Loading...</p>
                    }
                </div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Name</h3>
                    <input className="InputBox" type="text" onChange={this.handleNameChange} />
                    <h3>Email</h3>
                    <input className="InputBox" type="text" onChange={this.handleEmailChange} />
                    <button type="submit" className="Button">Submit</button>
                </form>
            </div>
        );
    }
}

export default App;
