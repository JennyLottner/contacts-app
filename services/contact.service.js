import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const CONTACTS_KEY = 'contactsDB'
_createContacts()


export const contactService = {
    query,
    get,
    remove,
    save,
    getEmptyContact,
    getDefaultFilter,
    getFilterFromParams
}
// For Debug only
window.cs = contactService


function query(filterBy = getDefaultFilter()) {
    console.log('filterBy', filterBy)

    return storageService.query(CONTACTS_KEY)
        .then(contacts => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                contacts = contacts.filter(contacts => regex.test(contacts.vendor))
            }
            if (filterBy.minSpeed) {
                contacts = contacts.filter(contacts => contacts.maxSpeed >= filterBy.minSpeed)
            }
            if (filterBy.desc) {
                const regex = new RegExp(filterBy.desc, 'i')
                contacts = contacts.filter(contacts => regex.test(contacts.desc))
            }
            return contacts
        })
}

function get(contactId) {
    return storageService.get(CONTACTS_KEY, contactId)
        .then(contact => _setNextPrevContactId(contact))
    // return axios.get(CONTACT_KEY, contactId)
}

function remove(contactId) {
    return storageService.remove(CONTACTS_KEY, contactId)
}

function save(contact) {
    if (contact.id) {
        return storageService.put(CONTACTS_KEY, contact)
    } else {
        contact = _createContact(contact.vendor, contact.maxSpeed)
        return storageService.post(CONTACTS_KEY, contact)
    }
}

function getEmptyContact(vendor = '', maxSpeed = '') {
    return { vendor, maxSpeed }
}

function getDefaultFilter() {
    return { txt: '' }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        txt: searchParams.get('txt') || defaultFilter.txt,
        minSpeed: searchParams.get('minSpeed') || defaultFilter.minSpeed,
        desc: searchParams.get('desc') || defaultFilter.desc
    }
}

function _createContacts() {
    let contacts = utilService.loadFromStorage(CONTACTS_KEY)
    if (!contacts || !contacts.length) {
        contacts = []
        contacts.push(_createContacts())
        contacts.push(_createContacts())
        contacts.push(_createContacts())
        contacts.push(_createContacts())
        contacts.push(_createContacts())
        contacts.push(_createContacts())
        contacts.push(_createContacts())
        contacts.push(_createContacts())
        utilService.saveToStorage(CONTACTS_KEY, contacts)
    }
}

function _createContact(vendor, maxSpeed = 250) {
    const contact = getEmptyContact(vendor, maxSpeed)
    contact.id = utilService.makeId()
    contact.desc = utilService.makeLorem(100)
    return contact
}

function _setNextPrevContactId(contact) {
    return storageService.query(CONTACTS_KEY).then((contacts) => {
        const contactIdx = contacts.findIndex((currContact) => currContact.id === contact.id)
        const nextContact = contacts[contactIdx + 1] ? contacts[contactIdx + 1] : contacts[0]
        const prevContact = contacts[contactIdx - 1] ? contacts[contactIdx - 1] : contacts[contacts.length - 1]
        contact.nextContactId = nextContact.id
        contact.prevContactId = prevContact.id
        return contact
    })
}
