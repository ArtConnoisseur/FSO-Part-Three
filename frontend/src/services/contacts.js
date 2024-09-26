import axios from 'axios';

const getInitialContacts = (dataFunction) => {
    const data = axios
        .get('http://localhost:3001/api/persons')
        .then((response) => {
            dataFunction(response.data);
        });
};

const addNewContact = (newEntry, dataFunction) => {
    axios
        .post('http://localhost:3001/api/persons', newEntry)
        .then((response) => { dataFunction(response.data) })
};

const deleteContact = (id, dataFunction) => {
    axios
        .delete('http://localhost:3001/api/persons/delete/' + id)
        .then((response) => { dataFunction(response.data) })
};

const updateContact = (id, changedContact, dataFunction, errorFunction) => {
    axios
        .put('http://localhost:3001/persons/' + id, changedContact)
        .then((response) => { dataFunction(response.data) })
        .catch((error) => { errorFunction(error.status) });
}

export default { getInitialContacts, addNewContact, deleteContact, updateContact }