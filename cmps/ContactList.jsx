const { Link } = ReactRouterDOM
const { useSelector } = ReactRedux


import { ContactPreview } from "./ContactPreview.jsx"

export function ContactList({ onRemoveContact }) {
	const contacts = useSelector(storeState => storeState.contactModule.contacts)

	return <ul className="contact-list">
		{contacts.map(contact => <li key={contact._id}>
			<Link to={`/contacts/${contact._id}`}>
				<ContactPreview contact={contact} />
			</Link>
			<div className="contact-actions">
				<button onClick={() => onRemoveContact(contact._id)}>Remove</button>
				<Link to={`/contacts/edit/${contact._id}`}>Edit</Link>
			</div>
		</li>
		)}
	</ul>
}