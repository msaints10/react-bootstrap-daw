import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface Todo {
    name: string;
}

interface TodoState {
    value: Todo[];
}

const initialState: TodoState = {
    value: [
        {
            'name': 'Dar de comer al gato'
        }
    ],
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state: TodoState, action: PayloadAction<Todo>) => {
            console.log(action.payload);
            state.value.push(action.payload)
        },
        initAddTodo: (state: TodoState, action: PayloadAction<Todo>) => {
            console.log(action.payload);
            state.value.push(action.payload)
        },
        removeTodo: (state: TodoState, action: PayloadAction<string>) => {
            console.log(action.payload);
            state.value = state.value.filter((todo) => todo.name !== action.payload);
        }
    }
})

export const { addTodo, initAddTodo, removeTodo } = todoSlice.actions
export const selectTodos = (state: RootState) => state.todos.value

export default todoSlice.reducer