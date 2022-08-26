function CloseButton({setSubmitted, setFormData, setEditRsvpGroup, editRsvpGroup, setRsvpCommitted, setShowRsvpDetails, setFamilyGroup}) {
    
    const handleClick = () => {
        setSubmitted(false)
        setRsvpCommitted(false)
        setShowRsvpDetails(false)
        if (editRsvpGroup && editRsvpGroup.length > 0) {
            setEditRsvpGroup([])
        }
        document.querySelector('body').style.cssText = `overflow: visible;`
        document.querySelector('html').style.overflow = 'visible'
        setFormData(f => ({...f, firstName: '', lastName: '', email: '', comments: ''}))
        setFamilyGroup(f => {
            f.forEach(person => person.rsvp = '')
            return f})
    }
    
    return (
        <button className="button close-button" onClick={handleClick}>X</button>
    )
}

export default CloseButton