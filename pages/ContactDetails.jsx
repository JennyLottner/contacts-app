const { useEffect, useState } = React
const { useParams } = ReactRouterDOM
const { Link } = ReactRouterDOM

import { contactService } from "../services/contact.service.js"

export function ContactDetails() {
    const [contact, setContact] = useState(null)
    const { contactId } = useParams()

    useEffect(() => {
        contactService.getContactById(contactId)
            .then(contact => setContact(contact))
    }, [contactId])

    // const birthStr = contactService.getBirthdayFromString(contact) || contact.birthday

    if (!contact) return <div className="loading-div">Loading contact...</div>
    return <section className="details-section column flex">
        <h1>Contact details</h1>

        <div className="details-actions flex space-between">
            <Link to={`/contacts`}><button>Back</button></Link>
            <Link to={`/contacts/edit/:${contact._id}`}><button>Edit contact</button></Link>
        </div>

        <div className="contact-details flex center">
            <img src={contact.img} />
            <div className="info">
                <h2>Full Name:&nbsp;&nbsp;<span>{contact.fullName}</span></h2>
                <h2>Birthday:&nbsp;&nbsp;<span>{contact.birthday}</span></h2>
                {/* <h2>Birthday:&nbsp;&nbsp;<span>{birthStr}</span></h2> */}
                <h2>Phone:&nbsp;&nbsp;<span>{contact.tel}</span></h2>
                <h2>Address:&nbsp;&nbsp;<span>{contact.address}</span></h2>
            </div>
        </div>
    </section>
}
