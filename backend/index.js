const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://info1998-a6.firebaseio.com"
});

const db = admin.firestore();

const dataCollection = db.collection('data');

app.get('/api/contact-cards', async (_, res) => {
    const data = await dataCollection.get();
    res.json(data.docs.map(doc => doc.data()));
});

app.post('/api/add-contact-card', async (req, res, next) => {
    if (!req.body.name || !req.body.email) {
        next(new Error("Invalid request body"));
    }
    else {
        const data = await dataCollection.get();
        let valid = data.docs.some(doc => doc.get('email') === req.body.email);
        if (valid) {
            res.send('NOT_OK');
        } else {
            await dataCollection.add({ name: req.body.name, email: req.body.email });
            res.send('OK');
        }
    }
});

// 404, no matching route found
app.use((_, res) => {
    res.status(404).send("Invalid API route");
});

// route for handling errors
app.use((err, _, res) => {
    res.status(400).send(err);
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});