function ShowDetails( { familyGroup, setResponseLoaded } ) {
    
    const handleEditRSVP = () => {
        setResponseLoaded(null)
    }
    
    return (
        <>
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
            <p>Notes: <em>{familyGroup[0].comments}</em></p>
            <button onClick={handleEditRSVP}>Edit RSVP</button>
        </>
    )
}

export default ShowDetails