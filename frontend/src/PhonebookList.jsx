import React from 'react';
import services from './services/contacts.js';

const Contact = ({ person, setPersons }) => {
    const handleDelete = (id, name) => {
        if (window.confirm(`Do you want to delete ${name}?`)) {
            services.deleteContact(id, (data) => window.alert(`${data.name} has been deleted!`));
            setPersons((state) => {
                return state.filter(contact => contact.id !== person.id);
            })
        }
    }
    return (
        <div key={person.id}>{person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
        </div>
    )
}

const PhonebookList = ({ persons, filterName, setPersons }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {!filterName && persons.map((person) => (
                <Contact person={person} key={person.id} setPersons={setPersons}/>
            ))}
            {filterName && persons.filter((person) => person.name.toLowerCase().includes(filterName)).map((person) => (
                <Contact person={person} key={person.id} setPersons={setPersons}/>
            ))}
        </div>
    );
};

export default PhonebookList;