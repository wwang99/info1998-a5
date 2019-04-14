import React, { Component } from 'react';
import './App.css';
import ContactCard from './ContactCard';

class ContactCardsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            data: [],
        };
    }

    componentDidMount = async () => {
        let response = await fetch('/api/contact-cards');
        let responseJSON = await response.json();
        this.setState({ fetched: true, data: responseJSON })
    }

    render() {
        const { fetched, data } = this.state;

        return (
            <div>
                <h1>Contact Cards</h1>
                <div className="ContactCardsContainer">
                    {
                        fetched ? (data.length !== 0 ? data.map(elt => <ContactCard name={elt.name} email={elt.email} />) : <p>No contact cards</p>) : <p>Loading...</p>
                    }
                </div>
            </div>
        );
    }
}

export default ContactCardsList;
