const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//-------------------------- GET all workouts -----------------------------------

const getWorkouts = async (req, res) => {
    try{
        const workouts = await Workout.find({}).sort({ createdAt: -1 });    // Sorting from newest to oldest
        res.status(200).json(workouts);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};

//---------------------------------------------------------------------------------

//--------------------------- GET a single workout --------------------------------

const getWorkout = async (req, res) => {
    // Extracting the id of the workout from the url parameters
    const {id} = req.params;

    try{
        // Checking if the id provided is of valid format
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ error: "No such workout"});
        }

        // Finding the workout
        const workout = await Workout.findById(id);

        if (!workout){
            return res.status(400).json({ error: "No such workout" });
        }
        res.status(200).json(workout);
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }
};

//---------------------------------------------------------------------------------

//------------------------------- POST a new workout ------------------------------

const createWorkout = async (req, res) => {

    // extracing the data from the body of the request
    const {title, load, reps} = req.body;

    const emptyFields = [];

    if (!title){
        emptyFields.push('title');
    }
    if (!load){
        emptyFields.push('load');
    }
    if (!reps){
        emptyFields.push('reps');
    }

    if (emptyFields.length > 0){
        return res.status(400).json({ error: "Please fill in all of the fields", emptyFields });
    }

    // Add a document to database
    try{
        // Adding a new document to the collection
        const workout = await Workout.create({title, load, reps});   // This is asynchronous
        res.status(200).json(workout);
    }
    catch(error){
        // Error handler
        res.status(400).json({error: error.message});
    }
};

//----------------------------------------------------------------------------------

//--------------------------------- DELETE a workout -------------------------------

const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "No such workout"});
    }

    try{
        const workout = await Workout.findOneAndDelete({ _id: id });

        if (!workout){
            // We write a return here as we don't want to code to carry on after the next statement
            return res.status(400).json({ error: "No such workout" });
        }
        res.status(200).json(workout);
    }
    catch(error){
        res.status(400).json({ error: error.message});
    }
};

//---------------------------------------------------------------------------------


//------------------------------------ UPDATE a workout ---------------------------
const updateWorkout = async(req, res) => {

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    // We find the workout with the id and then update that with the provided details in the body
    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})    // We need to spread the properties of the object (req.body)

    if(!workout){
        // We write a return here as we don't want to code to carry on after the next statement
        return res.status(404).json({error: "No workout found"})
    }

    res.status(200).json(workout)
}

//-------------------------------------------------------------------------------------

// Exporting the different functions
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}