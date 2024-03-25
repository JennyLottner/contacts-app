const { NavLink } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {

    return <header className="header-section flex align-center space-between">
        <div>Logo</div>

        <nav className="flex">
            <NavLink to="/" >Home</NavLink>
            {/* <NavLink to="/about" >About</NavLink> */}
            <NavLink to="/contacts" >Contacts</NavLink>
        </nav>
    </header>
}