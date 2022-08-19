import LoadingSpinner from './LoadingSpinner'

function EnterDetails( {responseLoaded, setResponseLoaded, familyGroup, setFamilyGroup } ) {
      
    const handleDetailsClick = () => {
      setResponseLoaded(false)
      const confirmDetailsWrapper = document.querySelector('.rsvp-form-container')
      confirmDetailsWrapper.classList.add('loading')
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ familyGroup })
      }
      fetch('api', requestOptions)
        .then(response => response.json())
        .then(data => {
          setResponseLoaded(true)
          confirmDetailsWrapper.classList.remove('loading')
          console.log(data)
        })
    }
  
    const handleCheckbox = (event, index) => {
      const newFamilyGroup = [...familyGroup]
      newFamilyGroup[index].rsvp = event.target.checked === true ? 'Yes' : 'No'
      setFamilyGroup(newFamilyGroup)
    }
  
    const handleCommentsChange = (event) => {
      const newFamilyGroup = [...familyGroup]
      newFamilyGroup.forEach(person => person.comments = event.target.value)
      setFamilyGroup(newFamilyGroup)
    }
  
    return (
      <div className="confirm-details-wrapper">
      <div className="confirm-details">
        <legend>Please confirm who will be attending the wedding.</legend>
        {familyGroup.map((person, index) => {
          return (
            <div key={person.uniqueID}>
              <input type="checkbox" id={person.uniqueID} name={person.firstName} checked={person.rsvp === 'Yes' || '' ? true : false} onChange={e => handleCheckbox(e, index)} />
              {/* Add default checked function to be checked if database says empty or yes */}
              <label htmlFor={person.firstName}>{person.firstName + ' ' + person.lastName}</label>
            </div>
          )})
        }
        <label htmlFor="comments">Notes (optional):</label>
        <textarea id="comments" className="comments" name="comments" rows="5" value={familyGroup[0].comments} onChange={handleCommentsChange} />
        <button type="button" className="button button-primary" onClick={handleDetailsClick}>Submit</button>
      </div>
      {responseLoaded == null || responseLoaded === true ? null : <LoadingSpinner />}
    </div>
    )
}

export default EnterDetails