import {useEffect, useState} from 'react';
import PhonebookForm from './PhonebookForm';
import PhonebookList from './PhonebookList';
import services from './services/contacts.js'

const Phonebook = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        services.getInitialContacts((data) => setPersons(data))
    }, [])

    const [filterName, setFilterName] = useState('');

    return (
        <div>
            <h2>Phonebook</h2>
            <PhonebookForm persons={persons} setPersons={setPersons} filterName={filterName} setFilterName={setFilterName} />
            <PhonebookList persons={persons} setPersons={setPersons} filterName={filterName} setFilterName={setFilterName} />
        </div>
    );
};

export default Phonebook;