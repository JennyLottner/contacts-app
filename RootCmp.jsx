const { Route, Routes } = ReactRouterDOM

import { HomePage } from './pages/HomePage.jsx'

export function RootCmp() {
    return (
        <div>
            {/* <AppHeader /> */}
            <main >
                <Routes>
                    <Route element={<HomePage />} path={'/'} />
                </Routes>
            </main>
        </div>
    )
}
