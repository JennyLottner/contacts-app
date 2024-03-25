const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { HomePage } from './pages/HomePage.jsx'
import { ContactDetails } from './pages/ContactDetails.jsx'
import { ContactIndex } from './pages/ContactIndex.jsx'

export function RootCmp() {
    return (
        <Router>
            {/* <AppHeader /> */}
            <main >
                <Routes>
                    <Route element={<HomePage />} path={'/'} />
                    <Route element={<ContactIndex />} path={'/index'} />
                    <Route element={<ContactDetails />} path={'/contact/:contactId'} />
                </Routes>
            </main>
        </Router>
    )
}
