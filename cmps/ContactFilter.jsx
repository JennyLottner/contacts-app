const { useEffect, useState, useRef } = React
import { utilService } from "../services/util.service.js"
export function ContactFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        ev.stopPropagation()

    }

    return <section className="contact-filter">
        <label htmlFor="txt">
            By text:
        </label>
        <input type="text" name="txt" id="txt" value={filterBy.txt} onChange={handleChange} />
        <label>By gender: </label>
        <select value={filterBy.gender} onChange={handleChange}>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
        </select>
        <label>By birthday month: </label>
        <select value={filterBy.birthMonth} onChange={handleChange}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
    </section>
}