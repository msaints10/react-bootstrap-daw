import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface Task {
    _id: string;
    name: string;
    description: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

interface TodoState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_KEY = import.meta.env.VITE_API_KEY || "02f080a9e5b81c8a23c0e82ab19b4a3e31ef9b9dd0c7c51ab4af82f3d49b10c9";

// Acciones asíncronas
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        const response = await fetch(`${API_BASE_URL}/tasks/getTasks`, {
            headers: {
                'Authorization': API_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error('Error fetching tasks');
        }
        
        return response.json();
    }
);

export const addTaskAsync = createAsyncThunk(
    'tasks/addTask',
    async (taskData: { name: string; description: string; dueDate: string }) => {
        const response = await fetch(`${API_BASE_URL}/tasks/addTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API_KEY
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            throw new Error('Error adding task');
        }

        return response.json();
    }
);

export const deleteTaskAsync = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId: string) => {
        const response = await fetch(`${API_BASE_URL}/tasks/removeTask/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('Error deleting task');
        }

        return taskId;
    }
);

const initialState: TodoState = {
    tasks: [],
    loading: false,
    error: null,
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error loading tasks';
            })
            // Add task
            .addCase(addTaskAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.unshift(action.payload);
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error adding task';
            })
            // Delete task
            .addCase(deleteTaskAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            })
            .addCase(deleteTaskAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error deleting task';
            });
    }
})

export const { clearError } = todoSlice.actions
export const selectTasks = (state: RootState) => state.todos.tasks
export const selectTasksLoading = (state: RootState) => state.todos.loading
export const selectTasksError = (state: RootState) => state.todos.error

export default todoSlice.reducer