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
    getFilterFromParams,
    getContactById
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
    if (contact._id) {
        return storageService.put(CONTACTS_KEY, contact)
    } else {
        contact._id = utilService.makeId()
        return storageService.post(CONTACTS_KEY, contact)
    }
}

function getDefaultFilter() {
    return { txt: '', gender: 'female', pageIdx: 0 }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        txt: searchParams.get('txt') || defaultFilter.txt,
        minSpeed: searchParams.get('minSpeed') || defaultFilter.minSpeed,
        desc: searchParams.get('desc') || defaultFilter.desc
    }
}

function getEmptyContact(fullName = '', gender = 'male', birthday = null) {
    return {
        _id: '',
        fullName,
        gender,
        birthday,
        tel: '',
        address: '',
        img: `https://robohash.org/${fullName}.png`
    }
}

function _createContacts() {
    let contacts = utilService.loadFromStorage(CONTACTS_KEY)
    if (!contacts || !contacts.length) {
        contacts = []
        contacts.push(_createContact('Gigi Tover', 'female'))
        contacts.push(_createContact('Chuck Tover', 'male'))
        contacts.push(_createContact('Alan Tover', 'male'))
        contacts.push(_createContact('Tova Tover', 'female'))
        contacts.push(_createContact('Yoni Schwartz', 'male'))
        contacts.push(_createContact('Suzi Schwartz', 'female'))
        contacts.push(_createContact('Sammy Tover', 'male'))
        contacts.push(_createContact('Miriam Tover', 'female'))
        contacts.push(_createContact('David Tover', 'male'))
        contacts.push(_createContact('Taylor Tover', 'female'))
        contacts.push(_createContact('Jonny Tover', 'male', '1996-03-16'))
        contacts.push(_createContact('Jenny Lottner', 'female', '1998-01-20'))
        contacts.push(_createContact('Michael Tover', 'male'))
        contacts.push(_createContact('Nomi Raban', 'female'))
        contacts.push(_createContact('Yoni Oz', 'male'))
        contacts.push(_createContact('Serena Tover', 'female'))
        utilService.saveToStorage(CONTACTS_KEY, contacts)
    }
}

function _createContact(fullName = '', gender = 'male', birthday = null) {
    const contact = getEmptyContact(fullName, gender, birthday)
    contact._id = utilService.makeId()
    const telStr = '0' + utilService.getRandomIntInclusive(500000000, 599999999)
    contact.tel = telStr.substring(0, 3) + '-' + telStr.substring(3)
    if (!contact.birthday) contact.birthday = _birthdayGenerator()
    contact.address = _addressGenerator()

    console.log('contact:', contact)
    return contact
}

function _addressGenerator() {
    const num = utilService.getRandomIntInclusive(1, 100)
    const streets = ['Shoshan St.', 'Chartzit Rd.', 'Savion Blvd.', 'Kalanit Ave.', 'Rakefet Rd.', 'Irus Ave.',
        'Yasmin St.', 'Sitvanit Blvd.', 'Vered St.', 'Sachlav Ave.', 'Tormus Blvd.']
    const cities = ['Tel-Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Rishon-LeZion', 'Kiryat-Gat', 'Beer-Sheva', 'Carmiel']
    const countries = ['Israel', 'USA', 'Tha Netherlands', 'India']

    return `${num} ${streets[utilService.getRandomIntInclusive(0, streets.length)]}, ${cities[utilService.getRandomIntInclusive(0, cities.length)]}, ${countries[utilService.getRandomIntInclusive(0, countries.length)]}`
}

function _birthdayGenerator() {
    const timestamp = utilService.getRandomIntInclusive(Date.now() - 3153000000000, Date.now())
    const bDay = new Date(timestamp)

    const year = bDay.getFullYear()
    const month = String(bDay.getMonth() + 1).padStart(2, '0')
    const day = String(bDay.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
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

function getContactById(id) {
    return storageService.get(CONTACTS_KEY, id)
}