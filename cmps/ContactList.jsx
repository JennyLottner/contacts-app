const { Link } = ReactRouterDOM

import { ContactPreview } from "./ContactPreview.jsx"

export function ContactList({ contacts, onRemoveContact }) {

	return <ul className="contact-list">
		{contacts.map(contact => <li key={contact._id}>
			<Link to={`/contact/${contact._id}`}>
				<ContactPreview contact={contact} />
			</Link>
			<div className="contact-actions">
				<button onClick={() => onRemoveContact(contact._id)}>x</button>
				<Link to={`/contact/edit/${contact._id}`}><button>Edit</button></Link>
			</div>
		</li>
		)}
	</ul>
}