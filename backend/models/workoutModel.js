const mongoose = require('mongoose')

// Defining the Schema function available with mongoose
const Schema = mongoose.Schema

// Defining the workouts Schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true})  // This saves the timestamps while creating/updating the new document

// We then create a model based on the defined schema and export that model
module.exports = mongoose.model('Workout', workoutSchema)