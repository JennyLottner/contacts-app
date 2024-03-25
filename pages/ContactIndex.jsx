const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

// import cmps

import { contactService } from './../services/contact.service.js'

export function ContactIndex() {
return <section className='index-section'>
    <h1>I am the ContactsIndex</h1>
</section>
}