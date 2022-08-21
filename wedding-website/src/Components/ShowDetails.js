import CloseButton from './CloseButton'

function ShowDetails( { familyGroup, setSubmitted, setRsvpCommitted } ) {
    
    const handleEditRSVP = () => {
        setRsvpCommitted(false)
    }

    const handleClose = () => {
        setSubmitted(false)
        document.querySelector('body').style.cssText = `overflow: visible;`
    }
    
    return (
        <div className="card show-details">
            <p>Thank you for your RSVP! Please check your details below to make sure everything looks right.</p>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Attending?</th>
                    </tr>
                </thead>
                <tbody>
                    {familyGroup.map(person => {
                        return (
                            <tr key={person.uniqueID}>
                                <td>{`${person.firstName} ${person.lastName}`}</td>
                                <td>{person.rsvp}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <p><strong>Notes:</strong> <em>{familyGroup[0].comments}</em></p>
            <button className="button button-primary" onClick={handleClose}>Done</button>
            <button className="button button-secondary" onClick={handleEditRSVP}>Edit RSVP</button>
            <CloseButton setSubmitted={setSubmitted} />
        </div>
    )
}

export default ShowDetails