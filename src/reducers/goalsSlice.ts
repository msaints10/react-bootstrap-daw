import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../store"

interface Goal {
    name: string
}

interface GoalsState {
    value: Goal[]
}

const initialState: GoalsState = {
    value: [
        {
            'name': 'Graduarme de la Universidad'
        }
    ],
}

export const todoSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        addGoal: (state, action: PayloadAction<Goal>) => {
            state.value.push(action.payload)
        }
    }
})

export const { addGoal } = todoSlice.actions
export const selectGoals = (state: RootState) => state.goals.value

export default todoSlice.reducer