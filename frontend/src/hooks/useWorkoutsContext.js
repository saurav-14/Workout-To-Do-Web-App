import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutsContext = () => {
    // context: {state, dispatch}
    const context = useContext(WorkoutContext);

    if(!context){
        throw Error("useWorkoutsContext must be inside the WorkoutsContextProvider")
    }

    return context
}