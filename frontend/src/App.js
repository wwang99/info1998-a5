import React, { Component } from 'react';
import './App.css';
import ContactCardAdder from './ContactCardAdder';
import ContactCardsList from './ContactCardsList';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ContactCardsList />
                <ContactCardAdder />
            </div>
        );
    }
}

export default App;
