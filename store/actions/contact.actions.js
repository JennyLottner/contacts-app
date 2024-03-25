import { ADD_CONTACT, REMOVE_CONTACT, SET_CONTACTS, UPDATE_CONTACT } from '../reducers/contact.reducer.js'
import { contactService } from '../../services/contact.service.js'
import { store } from '../store.js'


export function loadContacts(filterBy) {
    return contactService.query(filterBy)
        .then(contacts => {
            store.dispatch({
                type: SET_CONTACTS,
                contacts
            })
            return contacts
        })
        .catch(err => {
            console.error('Cannot load contacts:', err)
            throw err
        })
}


export function saveContact(contact) {
    const type = (contact._id) ? UPDATE_CONTACT : ADD_CONTACT
    return contactService.save(contact)
        .then(savedContact => {
            store.dispatch({
                type,
                contact: savedContact
            })
            return savedContact
        })
        .catch(err => {
            console.error('Cannot save contact:', err)
            throw err
        })
}

export function removeContact(contactId) {
    return contactService.remove(contactId)
        .then(() => {
            store.dispatch({
                type: REMOVE_CONTACT,
                contactId
            })
        })
        .catch(err => {
            console.error('Cannot remove contact:', err)
            throw err
        })
}


export function updateContact(contact) {
    return contactService.save(contact)
        .then((savedContact) => {
            store.dispatch({
                type: UPDATE_CONTACT,
                contact: savedContact
            })
        })
}

