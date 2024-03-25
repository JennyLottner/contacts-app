export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'


const initialState = {
    todos: null,
    filterBy: { txt: '', isDone: 'all', pageIdx: 0 },
}

export function todoReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case ADD_TODO:
            return { ...state, todos: [action.todo, ...state.todos] }
        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(todo => todo._id !== action.todoId) }
        case UPDATE_TODO:
            return { ...state, todos: state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo) }
        case SET_FILTER_BY:
            return { ...state, filterBy: action.val }
        default:
            return state
    }
}