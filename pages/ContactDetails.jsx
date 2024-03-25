import { contactService } from "../services/contact.service.js"
const { useEffect, useState } = React
const { useParams } = ReactRouterDOM
const { NavLink } = ReactRouterDOM
export function ContactDetails() {
    const [contact, setContact] = useState(null)
    const { contactId } = useParams()

    useEffect(() => {
            contactService.getContactById(contactId)
            .then(contact => setContact(contact))
        }, [contactId])

    if (!contact) return <div className="loading-div">Loading contact...</div>
    return <section className="contact-details">
        <img src={contact.img} />
        <div className="info">
        <h1>Contact details</h1>
        <h2>Full Name: <span>{contact.fullName}</span></h2>
        <h2>Birth day: <span>{contact.birthday}</span></h2>
        <h2>Phone: <span>{contact.tel}</span></h2>
        <h2>Address: <span>{contact.address}</span></h2>
        </div>
        <NavLink to={`/contacts/edit/:${contact._id}`}>Edit contact</NavLink>
    </section>
}
