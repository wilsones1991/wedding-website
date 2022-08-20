function ShowDetails( { familyGroup, setResponseLoaded } ) {
    
    const handleEditRSVP = () => {
        setResponseLoaded(null)
    }
    
    return (
        <div className="card show-details">
            <p>Thank you for your RSVP! Please check your details below to make sure everything looks right.</p>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Attending?</th>
                </tr>
                {familyGroup.map(person => {
                    return (
                        <tr>
                            <td>{`${person.firstName} ${person.lastName}`}</td>
                            <td>{person.rsvp}</td>
                        </tr>
                    )
                })}
            </table>
            <p><strong>Notes:</strong> <em>{familyGroup[0].comments}</em></p>
            <button className="button button-primary" onClick={handleEditRSVP}>Edit RSVP</button>
        </div>
    )
}

export default ShowDetails