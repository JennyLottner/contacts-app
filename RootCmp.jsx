const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

// import { Home } from './pages/home.jsx'

export function RootCmp() {
    return <Router>
        <section className="app main-layout">
            {/* <AppHeader /> */}

            <main className="full main-layout">
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                </Routes>
            </main>

            {/* <UserMsg /> */}
            {/* <AppFooter /> */}
        </section>
    </Router>
}