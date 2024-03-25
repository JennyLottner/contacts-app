const { Link } = ReactRouterDOM

import { contactService } from "../services/contact.service.js"

export function ContactPreview({ contact }) {

    const birthday = contactService.getBirthdayFromString(contact)

    return (
        <article className="contact-article flex align-center">
            <img src={contact.img} />
            <div>
                <h4>{contact.fullName}</h4>
                <h6>Birthday:&nbsp;&nbsp;<span>{birthday}</span></h6>
                <h6>Cell:&nbsp;&nbsp;<span>{contact.tel}</span></h6>
                <h6>Address:&nbsp;&nbsp;<span>{contact.address}</span></h6>
            </div>
        </article>
    )
}