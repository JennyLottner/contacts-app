import { saveContact } from "../store/actions/contact.actions.js"
import { contactService } from "../services/contact.service.js"
import { setMsg } from "../store/actions/app.actions.js"
const { useEffect, useState } = React
const { useNavigate } = ReactRouter
const { useParams } = ReactRouterDOM


export function ContactEdit() {
    const [contactToEdit, setContactToEdit] = useState(null)
    const navigate = useNavigate()
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
            .then(savedContact => {
                setMsg(`${savedContact.fullName} was successfully saved to our contact list!`)
                navigate('/contacts')
            })
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
        {contactToEdit &&
            <form className="contact-edit-form flex column" onSubmit={setContactDetails}>
                <div className="img-and-input-div flex space-evenly">
                    
                <img src={`https://robohash.org/${contactToEdit.fullName}?set=set2`} className="contact-edit-img"
                        title={`${contactToEdit.fullName}'s profile image`} alt={`${contactToEdit.fullName}'s profile image`} onLoad={handleChange} />

                    <div className="forms-div flex column">

                        <div className="flex space-between">
                            <label htmlFor="contact-fullname">Full name:&nbsp;&nbsp;</label>
                            <input id="contact-fullname" name="fullName" type="text" placeholder="Your full name" value={contactToEdit.fullName || ''} onChange={handleChange} />
                        </div>

                        <div className="flex space-between">
                            <label>Gender:&nbsp;&nbsp;</label>
                            <select value={contactToEdit.gender} name="gender" onChange={handleChange}>
                                <option value="f">Female</option>
                                <option value="m">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="flex space-between">
                            <label htmlFor="contact-birthday">Birth day:&nbsp;&nbsp;</label>
                            <input type="date" id="contact-birthday" name="birthday" value={contactToEdit.birthday || ''} onChange={handleChange} />
                        </div>

                        <div className="flex space-between">
                            <label htmlFor="contact-phone">Phone number:&nbsp;&nbsp;</label>
                            <input type="tel" name="tel" id="contact-phone" placeholder="xxx-xxxxxxx" value={contactToEdit.tel || ''} onChange={handleChange} />
                        </div>

                        <div className="flex space-between">
                            <label htmlFor="contact-address">Address:&nbsp;&nbsp;</label>
                            <input type="text" name="address" id="contact-address" placeholder="Your address" value={contactToEdit.address || ''} onChange={handleChange} /></div>
                    </div>
                </div>
                
                <button className="contact-edit-btn">Set</button>
            </form>}
    </section>
}