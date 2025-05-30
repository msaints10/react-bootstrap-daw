import { configureStore } from '@reduxjs/toolkit'
import goalsReducer from './reducers/goalsSlice'
import todoReducer from './reducers/todoSlice'

export const store = configureStore({
    reducer: {
        goals: goalsReducer,
        todos: todoReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch