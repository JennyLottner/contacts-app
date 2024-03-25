export const SET_PREFS = 'SET_PREFS'

const initialState = {
    prefs: {backgroundColor: '#ffffff', color: '#000000'}
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PREFS:
            return { ...state, prefs: action.val }
        default:
            return state
    }
}