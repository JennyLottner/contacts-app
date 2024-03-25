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
					<button onClick={() => onRemoveContact(contact._id)}><i className="fa-regular fa-trash-can"></i></button>
					<Link to={`/contacts/edit/${contact._id}`}><button><i className="fa-regular fa-pen-to-square"></i></button></Link>
				</div>
			</li>
		)}
	</ul>
}