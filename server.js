require('dotenv').config();
const express = require('express')
const connectToDB = require('./config/db')

const app = express()
const PORT = 3000

const Flights = require('./models/Flights')

//* render JSX pages
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine').createEngine());

//* settling a middleware to run in our app
app.use((req, res, next) => {
    console.log(req.url);
    next()
})
//* parses the data from the request
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
    res.send('<h1>Hey World</h1>')
})

//* Index Route: (returns a list of flights) 
app.get('/flights', (req, res) => {
    // res.send('list of flights')
    Flights.find({}, (error, allFlights) => {
        res.render('flights/Index', {flights: allFlights})
    })
})

//* Post method (accept data from the form)
app.post('/flights', (req, res) => {
    console.log(req.body);

    Flights.create(req.body, (error, createdFlights) => {
        // res.send(createdFlights)
        res.redirect('/flights')
    })
})

//* New Route: (returns a form to create a new flight)
app.get('/flights/new', (req, res) => {
    res.render('flights/New')
})










app.listen(3000, () => {
    console.log('Server is up!');
    connectToDB()
})