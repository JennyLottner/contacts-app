const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { HomePage } from './pages/HomePage.jsx'

export function RootCmp() {
    return (
        <Router>
            {/* <AppHeader /> */}
            <main >
                <Routes>
                    <Route element={<HomePage />} path={'/'} />
                </Routes>
            </main>
        </Router>
    )
}
