import CloseButton from './CloseButton'

function ShowDetails({ familyGroup, setRsvpCommitted, handleClose }) {
    const handleEditRSVP = () => {
        setRsvpCommitted(false)
    }

    return (
        <div className="card show-details">
            <p>
                Thank you for your RSVP! Please check your details below to make
                sure everything looks right.
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Attending?</th>
                    </tr>
                </thead>
                <tbody>
                    {familyGroup.map((person) => {
                        return (
                            <tr key={person.uniqueID}>
                                <td>{`${person.firstName} ${person.lastName}`}</td>
                                <td>{person.rsvp}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <p>
                <strong>Notes:</strong> <em>{familyGroup[0].comments}</em>
            </p>
            <CloseButton handleClose={handleClose} />
            <div>
                <button
                    type="button"
                    className="button button-primary"
                    onClick={handleClose}
                >
                    Done
                </button>
                <button
                    type="button"
                    className="button button-secondary"
                    onClick={handleEditRSVP}
                >
                    Edit RSVP
                </button>
            </div>
        </div>
    )
}

export default ShowDetails
