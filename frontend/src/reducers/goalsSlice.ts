import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from "../store"

interface Goal {
    _id: string;
    name: string;
    description: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

interface GoalsState {
    goals: Goal[];
    loading: boolean;
    error: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_KEY = import.meta.env.VITE_API_KEY || "02f080a9e5b81c8a23c0e82ab19b4a3e31ef9b9dd0c7c51ab4af82f3d49b10c9";

// Acciones asíncronas
export const fetchGoals = createAsyncThunk(
    'goals/fetchGoals',
    async () => {
        const response = await fetch(`${API_BASE_URL}/goals/getGoals`, {
            headers: {
                'Authorization': API_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error('Error fetching goals');
        }
        
        return response.json();
    }
);

export const addGoalAsync = createAsyncThunk(
    'goals/addGoal',
    async (goalData: { name: string; description: string; dueDate: string }) => {
        const response = await fetch(`${API_BASE_URL}/goals/addGoal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API_KEY
            },
            body: JSON.stringify(goalData)
        });

        if (!response.ok) {
            throw new Error('Error adding goal');
        }

        return response.json();
    }
);

export const deleteGoalAsync = createAsyncThunk(
    'goals/deleteGoal',
    async (goalId: string) => {
        const response = await fetch(`${API_BASE_URL}/goals/removeGoal/${goalId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('Error deleting goal');
        }

        return goalId;
    }
);

const initialState: GoalsState = {
    goals: [],
    loading: false,
    error: null,
}

export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch goals
            .addCase(fetchGoals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.loading = false;
                state.goals = action.payload;
            })
            .addCase(fetchGoals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error loading goals';
            })
            // Add goal
            .addCase(addGoalAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addGoalAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.goals.unshift(action.payload);
            })
            .addCase(addGoalAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error adding goal';
            })
            // Delete goal
            .addCase(deleteGoalAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteGoalAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.goals = state.goals.filter(goal => goal._id !== action.payload);
            })
            .addCase(deleteGoalAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error deleting goal';
            });
    }
})

export const { clearError } = goalSlice.actions
export const selectGoals = (state: RootState) => state.goals.goals
export const selectGoalsLoading = (state: RootState) => state.goals.loading
export const selectGoalsError = (state: RootState) => state.goals.error

export default goalSlice.reducer