import LoadingSpinner from './LoadingSpinner'

function EnterDetailsRadio( {responseLoaded, setResponseLoaded, familyGroup, setFamilyGroup } ) {
      
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
  
    const handleRadio = (event, index) => {
      const newFamilyGroup = [...familyGroup]
      newFamilyGroup[index].rsvp = event.target.value === "yes" ? 'Yes' : 'No'
      setFamilyGroup(newFamilyGroup)
    }
  
    const handleCommentsChange = (event) => {
      const newFamilyGroup = [...familyGroup]
      newFamilyGroup.forEach(person => person.comments = event.target.value)
      setFamilyGroup(newFamilyGroup)
    }
  
    return (
      <div className="confirm-details-wrapper">
        <div className="confirm-details card">
          <legend>Please confirm who will be attending the wedding.</legend>
          <div className="attendee-rsvp-container">
            {familyGroup.map((person, index) => {
              return (
                <div className="attendee-rsvp" key={person.uniqueID}>
                  <span className="attendee">{person.firstName + " " + person.lastName}</span>
                  <div className="radio-field">
                      <input type="radio" id="yes" name={person.uniqueID} checked={person.rsvp === 'Yes' || '' ? true : false} value="yes" onChange={e => handleRadio(e, index)} />
                      <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="radio-field">
                      <input type="radio" id="no" name={person.uniqueID} checked={person.rsvp === 'Yes' || '' ? false : true} value="no" onChange={e => handleRadio(e, index)} />
                      <label htmlFor="no">No</label>
                  </div>
                </div>
              )})
            }
          </div>
          <label htmlFor="comments">Notes (optional):</label>
          <textarea id="comments" className="comments" name="comments" rows="5" value={familyGroup[0].comments} onChange={handleCommentsChange} />
          <button type="button" className="button button-primary" onClick={handleDetailsClick}>Submit</button>
        </div>
        {responseLoaded == null || responseLoaded === true ? null : <LoadingSpinner />}
      </div>
    )
}

export default EnterDetailsRadio