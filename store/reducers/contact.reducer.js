export const SET_CONTACTS = 'SET_CONTACTS'
export const ADD_CONTACT = 'ADD_CONTACT'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const SET_FILTER_BY = 'SET_FILTER_BY'


const initialState = {
    contacts: null,
    filterBy: { txt: '', gender: 'all', pageIdx: 0 },
}

export function contactReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CONTACTS:
            return { ...state, contacts: action.contacts }
        case ADD_CONTACT:
            return { ...state, contacts: [action.contact, ...state.contacts] }
        case REMOVE_CONTACT:
            return { ...state, contacts: state.contacts.filter(contact => contact._id !== action.contactId) }
        case UPDATE_CONTACT:
            return { ...state, contacts: state.contacts.map(contact => contact._id === action.contact._id ? action.contact : contact) }
        case SET_FILTER_BY:
            return { ...state, filterBy: action.val }
        default:
            return state
    }
}