const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :req[body]'));


app.use(express.static('dist'));

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.send(persons);
});

app.get('/api/info', (req, res) => {
   const information = `<p>Phonebook has information on ${persons.length} people<br/><br/>${new Date()}</p>`
    res.send(information);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);

    if (person) {
        res.send(person);
    } else {
        res.status(404).send('Contact not found');
    }
});

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/persons', (req, res) => {
    const { body } = req;

    if (body.name && body.number ) {
        const newNote = {
            id: generateId(),
            name: body.name,
            number: body.number,
        };

        persons = [...persons, newNote];

        return res
            .status(201)
            .send(newNote);
    } else {
        return res.status(400).json({
            error: 'content missing'
        })
    }

});

app.delete('/api/persons/delete/:id', (req, res) => {
    const id = req.params.id;

    const person = persons.find(person => person.id === id);

    if (person) {
        persons = persons.filter(person => person.id !== id);
        res.status(204).send(person.name).end();
    } else {
        res.status(404).send('Contact not found');
    }
});

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);

    const { body } = req;

    if (person) {
        console.log(body);
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});