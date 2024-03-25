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
    getContactById,
    getBirthdayFromString
}
// For Debug only
window.cs = contactService


function query(filterBy = getDefaultFilter()) {

    return storageService.query(CONTACTS_KEY)
        .then(contacts => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                contacts = contacts.filter(contact => regex.test(contact.fullName) || regex.test(contact.address))
            }
            if (filterBy.gender && filterBy.gender !== 'all') {
                const regex = new RegExp(filterBy.gender, 'i')
                contacts = contacts.filter(contact => regex.test(contact.gender))
            }
            if (filterBy.birthMonth && filterBy.birthMonth !== 'all') {
                contacts = contacts.filter(contact => {
                    const birthdayArr = contact.birthday.split('-')
                    return birthdayArr[1] === filterBy.birthMonth
                })
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
    return { txt: '', gender: 'all', birthMonth: 'all', pageIdx: 0 }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        txt: searchParams.get('txt') || defaultFilter.txt,
        gender: searchParams.get('gender') || defaultFilter.gender,
        birthMonth: searchParams.get('birthMonth') || defaultFilter.birthMonth
    }
}

function getEmptyContact(fullName = '', gender = 'm', birthday = null) {
    return {
        _id: '',
        fullName,
        gender,
        birthday,
        tel: '',
        address: '',
        img: `https://robohash.org/${fullName}?set=set2`
    }
}

function _createContacts() {
    let contacts = utilService.loadFromStorage(CONTACTS_KEY)
    if (!contacts || !contacts.length) {
        contacts = []
        contacts.push(_createContact('Shoval Sabag', 'f'))
        contacts.push(_createContact('Chuck Tover', 'm'))
        contacts.push(_createContact('Gigi Tover', 'f'))
        contacts.push(_createContact('Alan Tover', 'm'))
        contacts.push(_createContact('Tova Tover', 'f'))
        contacts.push(_createContact('Yoni Schwartz', 'm'))
        contacts.push(_createContact('Suzi Schwartz', 'f'))
        contacts.push(_createContact('Sammy Tover', 'm'))
        contacts.push(_createContact('Miriam Tover', 'f'))
        contacts.push(_createContact('David Tover', 'm'))
        contacts.push(_createContact('Taylor Tover', 'f'))
        contacts.push(_createContact('Jonny Tover', 'm', '1996-03-16'))
        contacts.push(_createContact('Jenny Lottner', 'f', '1998-01-20'))
        contacts.push(_createContact('Michael Tover', 'm'))
        contacts.push(_createContact('Nomi Raban', 'f'))
        contacts.push(_createContact('Yoni Oz', 'm'))
        contacts.push(_createContact('Serena Tover', 'f'))
        utilService.saveToStorage(CONTACTS_KEY, contacts)
    }
}

function _createContact(fullName = '', gender = 'm', birthday = null) {
    const contact = getEmptyContact(fullName, gender, birthday)
    contact._id = utilService.makeId()
    const telStr = '0' + utilService.getRandomIntInclusive(500000000, 599999999)
    contact.tel = telStr.substring(0, 3) + '-' + telStr.substring(3)
    if (!contact.birthday) contact.birthday = _birthdayGenerator()
    contact.address = _addressGenerator()

    return contact
}

function _addressGenerator() {
    const num = utilService.getRandomIntInclusive(1, 100)
    const streets = ['Shoshan St.', 'Chartzit Rd.', 'Savion Blvd.', 'Kalanit Ave.', 'Rakefet Rd.', 'Irus Ave.',
        'Yasmin St.', 'Sitvanit Blvd.', 'Vered St.', 'Sachlav Ave.', 'Tormus Blvd.']
    const cities = ['Tel-Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Rishon-LeZion', 'Kiryat-Gat', 'Beer-Sheva', 'Carmiel']

    return `${num} ${streets[utilService.getRandomIntInclusive(0, streets.length - 1)]}, ${cities[utilService.getRandomIntInclusive(0, cities.length - 1)]}, Israel`
}

function _birthdayGenerator() {
    const timestamp = utilService.getRandomIntInclusive(Date.now() - 3153000000000, Date.now())
    const bDay = new Date(timestamp)

    const year = bDay.getFullYear()
    const month = String(bDay.getMonth() + 1).padStart(2, '0')
    const day = String(bDay.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

function getBirthdayFromString(contact) {
    const birthdayArr = contact.birthday.split('-')
    const date = new Date(Date.UTC(birthdayArr[0], birthdayArr[1] - 1, birthdayArr[2]))

    let day = date.getDate()

    if (day >= 11 && day <= 13) {
        day = day + 'th' // Special case for 11th, 12th, and 13th
    } else {
        switch (day % 10) {
            case 1:
                day = day + 'st'
                break
            case 2:
                day = day + 'nd'
                break
            case 3:
                day = day + 'rd'
                break
            default:
                day = day + 'th'
        }
    }
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`
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

//