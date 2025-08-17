const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
    } = require('../controllers/workoutControllers')


// This creates a router which we will attach to the app
// in the server.js file
const routes = express.Router();

// Get all of the workouts
routes.get('/', getWorkouts)

// GET a single workout
routes.get('/:id', getWorkout)

// POST a single workout
routes.post('/', createWorkout)

// DELETE a workout
routes.delete('/:id', deleteWorkout)

// UPDATE a workout
routes.patch('/:id', updateWorkout)

// We just export the router
module.exports = routes;