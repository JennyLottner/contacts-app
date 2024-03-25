const { useEffect, useState, useRef } = React
import { utilService } from "../services/util.service.js"
export function ContactFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

   
    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return <section className="contact-filter">
        <label htmlFor="txt">
            By text:
        </label>
        <input type="text" name="txt" id="txt" value={filterBy.txt} onChange={handleChange} />
        <label>By gender: </label>
        <select value={filterBy.gender} name="gender" onChange={handleChange}>
            <option value="all">All</option>
            <option value="f">Female</option>
            <option value="m">Male</option>
            <option value="other">Other</option>
        </select>
        <label>By birthday month: </label>
        <select name="birthMonth" value={filterBy.birthMonth} onChange={handleChange}>
            <option value="all">All</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
    </section>
}