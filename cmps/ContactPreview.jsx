const { Link } = ReactRouterDOM

export function ContactPreview({ contact }) {
    return (
        <article>
            <h4>{contact.fullName}</h4>
            <h6>{contact.birthday}</h6>
            <h6>{contact.tel}</h6>
            <h6>{contact.address}</h6>
        </article>
    )
}