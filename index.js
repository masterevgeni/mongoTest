const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
require('dotenv/config')
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT;

const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


app.get('/', (req, res) => {
    res.send('I\'m alive')
})

require("./routes/routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});