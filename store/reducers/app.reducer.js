export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        // case SET_USER_BALANCE:
        //     if (!state.user) return state
        //     return { ...state, user: { ...state.user, balance: action.balance } }
        default:
            return state
    }
}