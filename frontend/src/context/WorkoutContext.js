import { createContext, useReducer } from "react";

// Defining a context for the workouts
export const WorkoutContext = createContext();

// Creating a reducer function
export const workoutReducer = (state, action) => {
    switch(action.type){
        case 'SET_WORKOUTS':
            return{
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return{
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        default:
            return state
    }
}

// Creating a component which provides the context for the workouts
export const WorkoutContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null
    })
    return (
        <WorkoutContext.Provider value = {{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}