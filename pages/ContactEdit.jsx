
import { contactService } from "../services/contact.service.js"
const { useEffect, useState } = React
const { useParams } = ReactRouterDOM
export function ContactEdit() {
    const [contact, setContact] = useState(null)
    const { contactId } = useParams()
    
    useEffect(() => {
        contactService.getContactById(contactId)
            

    })
}