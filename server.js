const express = require('express');

const server = express();
server.use(express.json());

let userArr = [
    {
        name: 'Idong'
    },
    {
        name: 'Joy'
    },
    {
        name: 'Remi'
    },
];

server.get('/', (req, res) => {
    res.status(200).json(userArr);
});

server.post('/users', (req, res) => {
    if(req.body.name){
        userArr.push(req.body);
        res.status(201).json({ message: 'user added', user: req.body });
    } else {
        res.status(401).json({ message: 'no data available' });
    }
});

server.delete('/users', (req, res) => {
    if(req.body.name){
        userArr = userArr.filter(del => del.name !== req.body.name);
        res.status(201).json({ message: 'user found', user: req.body });
    } else {
        res.status(401).json({ message: 'no user found' });
    }
});

module.export = server;