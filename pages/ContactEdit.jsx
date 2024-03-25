import { contactService } from "../services/contact.service.js"
const { useEffect, useState } = React
const { useParams } = ReactRouterDOM
export function ContactEdit() {
    const [contactToEdit, setContactToEdit] = useState(null)
    const { contactId } = useParams()

    useEffect(() => {
        contactService.getContactById(contactId)
            .then(contact => setContactToEdit(contact))
    }, [contactId])

    function setContactDetails(ev) {
        ev.preventDefault()
        if(!contactToEdit._id) contactService.

    }

    function handleChange(ev) {
        ev.stopPropagation()
        const { target } = ev
        const { name:field, type, value} = target
        if(type === number) value = +value
        setContactToEdit((prevContact) => ({ ...prevContact, [field]: value }))
    }

    if (!contactToEdit) return <div className="loading-div">Loading contact...</div>
    return <section className="contact-edit">
        <h1>Edit your contact page</h1>
        {contactToEdit && <form className="edit-contact-form" onSubmit={setContactDetails}>
            <label htmlFor="contact-fullname">Full name: </label>
            <input id="contact-fullname" name="fullname" type="text" name="fullname" placeholder="Your full name" value={contactToEdit.fullname || ''} onChange={handleChange} />
            <label htmlFor="contact-birthday">Birth day: </label>
            <input type="date" id="contact-birthday" name="birthday" value={contactToEdit.birthday} onChange={handleChange} />
            <label htmlFor="contact-phone">Phone number (Israeli format, xxx-xxx-xxxx): </label>
            <input type="tel" name="phone" id="contact-phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={contactToEdit.phone || '' } onChange={handleChange} />
            <label htmlFor="contact-address">Address: </label>
            <input type="text" name="address" id="contact-address" value={contactToEdit.address || ''} onChange={handleChange} />
            <label htmlFor="contact-img">Profile image: </label>
            <img src={`https://robohash.org/${contactToEdit.fullname}?set=set2`} title={`${contactToEdit.fullname}'s profile image`} alt={`${contactToEdit.fullname}'s profile image`} />
            <button>Set!</button>
        </form>}
    </section>
}