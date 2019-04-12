const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let data = [];

app.get('/api/contact-cards', (req, res) => {
    res.send(data);
});

app.post('/api/add-contact-card', (req, res, next) => {
    if (!req.body.name || !req.body.email) {
        next(new Error("Invalid request body"));
    }
    else {
        let valid = true;
        data.forEach(elt => {
            if (elt.email === req.body.email) {
                valid = false;
            }
        });

        if (valid) {
            data.push({ name: req.body.name, email: req.body.email });
            res.send("OK");
        }
        else {
            res.send("NOT_OK");
        }
    }
});

// 404, no matching route found
app.use((req, res) => {
    res.status(404).send("Invalid API route");
});

// route for handling errors
app.use((err, req, res) => {
    res.status(400).send(err);
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});