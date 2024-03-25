const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { HomePage } from './pages/HomePage.jsx'
import { ContactDetails } from './pages/ContactDetails.jsx'
import { ContactIndex } from './pages/ContactIndex.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'

export function RootCmp() {
    return (
        <Router>
            <AppHeader />
            <main >
                <Routes>
                    <Route element={<HomePage />} path={'/'} />
                    <Route element={<ContactIndex />} path={'/contacts'} />
                    <Route element={<ContactDetails />} path={'/contacts/:contactId'} />
                    <Route element={<ContactDetails />} path={'/contacts/edit'} />
                    <Route element={<ContactDetails />} path={'/contacts/edit/:contactId'} />
                </Routes>
            </main>
        </Router>
    )
}
