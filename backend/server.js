// To start the server: npm run dev
require('dotenv').config();

// Getting the required packages and functions
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// Starting the express application
const app = express();

// Middleware

// This middleware checks if the req has any body attatched to them, 
// and if yes, then it parses the body into json format
app.use(express.json())

// This middleware is for logging the requested path by the uesr
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI) // This is a promise
    .then(() => {
        // Listening the requests after connecting to the database
        app.listen(process.env.PORT, () =>{
            console.log("Connected to the db & Listening on port: " + process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })


