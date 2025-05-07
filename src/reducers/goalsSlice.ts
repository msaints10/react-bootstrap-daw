import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../store"

interface Goal {
    id: number;
    name: string;
    complete: boolean;
}

interface GoalsState {
    value: Goal[]
}

const initialState: GoalsState = {
    value: [
        {
            id: 1,
            name: 'Graduarme de la Universidad',
            complete: false
        }
    ],
}

export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        addGoal: (state, action: PayloadAction<{ name: string }>) => {
            state.value.push({
                id: state.value.length + 1,
                name: action.payload.name,
                complete: false
            })
        },
        removeGoal: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter((goal) => goal.id !== action.payload);
        },
        toggleGoal: (state, action: PayloadAction<number>) => {
            const goal = state.value.find(goal => goal.id === action.payload);
            if (goal) {
                goal.complete = !goal.complete;
            }
        }
    }
})
export const { addGoal, removeGoal, toggleGoal } = goalSlice.actions
export const selectGoals = (state: RootState) => state.goals.value

export default goalSlice.reducer