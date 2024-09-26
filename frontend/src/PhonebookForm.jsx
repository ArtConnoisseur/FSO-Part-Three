import { useState } from 'react';
import services from './services/contacts.js';

const PhonebookForm = ({ persons, setPersons, filterName, setFilterName }) => {
    const [contact, setContact] = useState({ name: '', number: '' });
    const [added, setAdded] = useState('');
    const [error, setError] = useState('');

    const addStyles = {
        border: 'solid 1px green',
        borderRadius: '10px',
        color: 'green',
        backgroundColor: '#00000030',
        padding: '10px',
        justifyContent: 'start',
        justifyItems: 'start'
    };

    const errorStyles = {
        border: 'solid 1px red',
        borderRadius: '10px',
        color: 'red',
        backgroundColor: '#00000030',
        padding: '10px',
        justifyContent: 'start',
        justifyItems: 'start'
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!persons.map((person) => person.name).includes(contact.name)) {
            const newEntry = {name: contact.name, number: contact.number, id: persons.at(-1).id + 1}
            services.addNewContact(newEntry, (data) => { setPersons([...persons, data])
            setAdded(`${contact.name} has been added!`)})

            setTimeout(() => setAdded(''), 3000)
        } else {
           if (confirm(`${contact.name} is already added to phonebook, would you like to update the number?`)) {
               const existingContact = persons.find((note) => note.name === contact.name)
               const updatedContact = { ...existingContact, number: contact.number }
               services.updateContact(existingContact.id, updatedContact, (data) => {
                   setPersons((state) => state.map((person) => person.id !== existingContact.id ? person : updatedContact ));
               }, (status) => {
                   if (status === 404) {
                       window.location.reload();
                       setError(`The contact information of ${contact.name} has been removed from the server!`);
                   }
               })
           }
        }

        setContact({
            name: '',
            number: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {added && <div style={addStyles}>{added}</div>}
            {error && <div style={errorStyles}>{error}</div>}

            <div>
                filter by: <input value={filterName} onChange={(e) => setFilterName(e.target.value)} />
            </div>
            <div>
                name: <input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
            </div>
            <div>
                number: <input value={contact.number} onChange={(e) => setContact({ ...contact, number: e.target.value })} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PhonebookForm;
