import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null)
    const {dispatch} = useWorkoutsContext();
    const[emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the page from reloading on form submission

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {'Content-Type': 'application/json'}
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setError(null)
            console.log("new workout added: ", json)
            dispatch({type:'CREATE_WORKOUT', payload: json})
            // Resetting the values of the form for another submission of the form
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([])
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label> Exercise Title:</label>
            <input 
                type='text'
                onChange = {(e) => {setTitle(e.target.value)}}
                value = {title}
                placeholder="Which Workout?"
                className={emptyFields.includes('title') ? 'error':''}
            />

            <label> Loads (in kg):</label>
            <input 
                type='number'
                onChange = {(e) => {setLoad(e.target.value)}}
                value = {load}
                placeholder="Load?"
                className={emptyFields.includes('load') ? 'error':''}
            />

            <label> Reps:</label>
            <input 
                type='number'
                onChange = {(e) => {setReps(e.target.value)}}
                value = {reps}
                placeholder="Reps?"
                className={emptyFields.includes('reps') ? 'error':''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm