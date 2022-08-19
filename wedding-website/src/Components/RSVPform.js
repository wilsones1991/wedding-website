import { useState, useEffect } from 'react'
import EnterDetails from './EnterDetails'
import ShowDetails from './ShowDetails'

function RSVPform() {
  
  const [invitees, setInvitees] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [familyGroup, setFamilyGroup] = useState([])
  const [formData, setFormData] = useState({
    lastName: ''
  })

  useEffect(() => {
    fetch('api')
      .then((res) => res.json())
      .then((data) => {
        setInvitees(data)
      })
      .catch(error => console.log(error))
  })

  const handleLastNameChange = (event) => {
    setFormData({...formData, lastName: event.target.value})
  }

  const handleLastNameSubmit = () => {
    const lastName = new RegExp(formData.lastName, 'i')
    const invitee = invitees.filter(i => lastName.test(i.lastName))
    console.log(invitee)
    if (invitee.length > 1) {
      return
    }
    renderConfirm(invitee[0])
    
  }

  const renderConfirm = (invitee) => {
    const form = document.getElementById("rsvp-form-container")
    form.classList.add('animate')
    form.addEventListener('transitionend', () => {
      // Add condition to only run this event listener if it's the collapse one.
      const getName = document.getElementById("get-name")
      getName.remove()
      setSubmitted(true)
      setFamilyGroup(invitees.filter(i => i.groupID === invitee.groupID))
      form.classList.add('expand')
    })
  }

  return (
    <section id="rsvp">
    <h2>RSVP</h2>
      <div id="bottom-buffer" className="bottom-buffer">
        <div id="rsvp-form-container" className='rsvp-form-container'>
          <form id="get-party" className="get-party">
            <div id="get-name">
              <label htmlFor="name">What is the last name on the invitation?</label>
              <div className="input-container">
                  <input value={formData.lastName} type="text" name="name" onChange={handleLastNameChange} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleLastNameSubmit()
                    }
                    }}></input>
                  <button type="button" className="button button-primary" onClick={handleLastNameSubmit}>Submit</button>
              </div>
            </div>
          </form>
          <ConfirmRSVPDetails submitted={submitted} familyGroup={familyGroup} setFamilyGroup={setFamilyGroup} />
        </div>
      </div>
    </section>
  )
}

function ConfirmRSVPDetails( {submitted, familyGroup, setFamilyGroup } ) {

  const [responseLoaded, setResponseLoaded] = useState(null)

  return !submitted ? null : !responseLoaded ? <EnterDetails responseLoaded={responseLoaded} setResponseLoaded={setResponseLoaded} familyGroup={familyGroup} setFamilyGroup={setFamilyGroup} /> : <ShowDetails familyGroup={familyGroup} setResponseLoaded={setResponseLoaded} />
}

export default RSVPform