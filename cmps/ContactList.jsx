const { Link } = ReactRouterDOM
const { useSelector } = ReactRedux


import { ContactPreview } from "./ContactPreview.jsx"

export function ContactList({ onRemoveContact }) {
	const contacts = useSelector(storeState => storeState.contactModule.contacts)

	return <ul className="contact-list">
		{contacts.map(contact =>
			<li key={contact._id} className="flex space-between align-center">
				<Link to={`/contacts/${contact._id}`}>
					<ContactPreview contact={contact} />
				</Link>
				<div className="contact-actions flex space-evenly">
					<button className="remove-btn" onClick={() => onRemoveContact(contact._id)}></button>
					<Link to={`/contacts/edit/${contact._id}`}><button className="edit-btn"></button></Link>
				</div>
			</li>
		)}
	</ul>
}