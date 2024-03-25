const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { HomePage } from './pages/HomePage.jsx'
import { ContactDetails } from './pages/ContactDetails.jsx'
import { ContactIndex } from './pages/ContactIndex.jsx'
import { ContactEdit } from './pages/ContactEdit.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

export function RootCmp() {
    return (
        <Router>
            {/* <AppHeader /> */}
            <main >
                <Routes>
                    <Route element={<HomePage />} path={'/'} />
                    <Route element={<ContactIndex />} path={'/contacts'} />
                    <Route element={<ContactDetails />} path={'/contacts/:contactId'} />
                    <Route element={<ContactEdit />} path={'/contacts/edit'} />
                    <Route element={<ContactEdit />} path={'/contacts/edit/:contactId'} />
                </Routes>
            </main>
            <AppFooter />
        </Router>
    )
}
