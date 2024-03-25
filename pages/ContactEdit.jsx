import { saveContact } from "../store/actions/contact.actions.js"
import { contactService } from "../services/contact.service.js"
import { setMsg } from "../store/actions/app.actions.js"
const { useEffect, useState } = React
const { useParams } = ReactRouterDOM

export function ContactEdit() {
    const [contactToEdit, setContactToEdit] = useState(null)
    const { contactId } = useParams()

    useEffect(() => {
        if (!contactId) setContactToEdit(contactService.getEmptyContact)
        else {
            contactService.getContactById(contactId)
            .then(contact => setContactToEdit(contact))
        }
    }, [contactId])

    function setContactDetails(ev) {
        ev.preventDefault()
        saveContact(contactToEdit)
            .then(savedContact => setMsg(`${savedContact.fullName} was successfully saved to our contact list!`))
            .catch(err => console.log('err', err))
    }

    function handleChange(ev) {
        ev.stopPropagation()
        const { target } = ev
        const { name: field, type, value } = target
        if (type === 'number') value = +value
        setContactToEdit((prevContact) => ({ ...prevContact, [field]: value }))
    }

    if (!contactToEdit) return <div className="loading-div">Loading contact...</div>
    return <section className="contact-edit">
        <h1>Edit your contact details</h1>
        {contactToEdit && <form className="edit-contact-form" onSubmit={setContactDetails}>
            <label htmlFor="contact-fullname">Full name: </label>
            <input id="contact-fullname" name="fullName" type="text" placeholder="Your full name" value={contactToEdit.fullName || ''} onChange={handleChange} />
            <label>Gender: </label>
            <select value={contactToEdit.gender} name="gender" onChange={handleChange}>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </select>
            <label htmlFor="contact-birthday">Birth day: </label>
            <input type="date" id="contact-birthday" name="birthday" required value={contactToEdit.birthday || ''} onChange={handleChange} />
            <label htmlFor="contact-phone">Phone number: </label>
            <input type="tel" name="tel" id="contact-phone" placeholder="xxx-xxx-xxxx" pattern="[0-9]{10}" value={contactToEdit.tel || ''} onChange={handleChange} />
            <label htmlFor="contact-address">Address: </label>
            <input type="text" name="address" id="contact-address" value={contactToEdit.address || ''} onChange={handleChange} />
            <label htmlFor="contact-img">Profile image: </label>
            <img src={`https://robohash.org/${contactToEdit.fullName}?set=set2`} title={`${contactToEdit.fullname}'s profile image`} alt={`${contactToEdit.fullname}'s profile image`} />
            <button>Set!</button>
        </form>}
    </section>
}