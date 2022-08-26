import CloseButton from './CloseButton'

function ShowDetails( { familyGroup, setFamilyGroup, setSubmitted, setRsvpCommitted, setFormData, editRsvpGroup, setEditRsvpGroup, setShowRsvpDetails } ) {

    const handleEditRSVP = () => {
        setRsvpCommitted(false)
    }

    const handleClose = () => {
        setSubmitted(false)
        setRsvpCommitted(false)
        setShowRsvpDetails(false)
        setFamilyGroup(f => {
            f.forEach(person => person.rsvp = '')
            return f})
        if (editRsvpGroup && editRsvpGroup.length > 0) {
            setEditRsvpGroup([])
        }
        document.querySelector('body').style.cssText = `overflow: visible;`
        document.querySelector('html').style.overflow = 'visible'
        setFormData(f => ({...f, firstName: '', lastName: '', email: '', comments: ''}))
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
            <CloseButton setSubmitted={setSubmitted} setFormData={setFormData} editRsvpGroup={editRsvpGroup} setEditRsvpGroup={setEditRsvpGroup} setRsvpCommitted={setRsvpCommitted} setShowRsvpDetails={setShowRsvpDetails} setFamilyGroup={setFamilyGroup} />
            <div>
                <button className="button button-primary" onClick={handleClose}>Done</button>
                <button className="button button-secondary" onClick={handleEditRSVP}>Edit RSVP</button>
            </div>
            
            
        </div>
    )
}

export default ShowDetails