const { useState, useEffect } = React
const { Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
import { ContactFilter } from '../cmps/ContactFilter.jsx'
import { ContactList } from '../cmps/ContactList.jsx'
import { contactService } from './../services/contact.service.js'
import { loadContacts, saveContact, removeContact, setFilterBy } from '../store/actions/contact.actions.js'

export function ContactIndex() {

    const dispatch = useDispatch()
    const contacts = useSelector(storeState => storeState.contactModule.contacts)
    const filterBy = useSelector(storeState => storeState.contactModule.filterBy)

    useEffect(() => {
        loadContacts()
            .catch(err => {
                showErrorMsg('Cannot load contacts!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveContact(contactId) {
        removeContact(contactId)
            .then(() => {
                showSuccessMsg('Contact removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove contact')
            })
    }

    return <section className='index-section'>
        <h3>Contacts</h3>
            <main>
                <Link to="/contacts/edit"><button>Add Contact</button></Link>

                <ContactFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                {(contacts && contacts.length)
                    ? <ContactList
                        onRemoveContact={onRemoveContact}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
    </section>
}