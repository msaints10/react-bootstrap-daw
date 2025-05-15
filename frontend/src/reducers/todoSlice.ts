import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface Todo {
    id: number;
    name: string;
    complete: boolean;
}

interface TodoState {
    value: Todo[]
}


const initialState: TodoState = {
    value: [
        {
            id: 1,
            name: 'Dar de comer al gato',
            complete: false
        }
    ],
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state: TodoState, action: PayloadAction<{ name: string }>) => {
            state.value.push({
                id: state.value.length + 1,
                name: action.payload.name,
                complete: false
            })
        },
        initAddTodo: (state: TodoState, action: PayloadAction<Todo>) => {
            console.log(action.payload);
            state.value.push(action.payload)
        },
        toggleTodo: (state: TodoState, action: PayloadAction<number>) => {
            const todo = state.value.find(todo => todo.id === action.payload);
            if (todo) {
                todo.complete = !todo.complete;
            }
        },
        removeTodo: (state: TodoState, action: PayloadAction<number>) => {
            state.value = state.value.filter((todo) => todo.id !== action.payload);
        }
    }
})

export const { addTodo, initAddTodo, toggleTodo, removeTodo } = todoSlice.actions
export const selectTodos = (state: RootState) => state.todos.value

export default todoSlice.reducer