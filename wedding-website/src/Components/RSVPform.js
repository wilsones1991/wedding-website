import { useState, useEffect } from 'react'
import GetParty from './GetParty'
import EnterDetailsRadio from './EnterDetailsRadio'
import ShowDetails from './ShowDetails'

function RSVPform() {
  
  const [invitees, setInvitees] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [familyGroup, setFamilyGroup] = useState([])
  const [rsvpCommitted, setRsvpCommitted] = useState(false)
  

  useEffect(() => {
    fetch('api')
      .then((res) => res.json())
      .then((data) => {
        setInvitees(data)
      })
      .catch(error => console.log(error))
  })
  return (
    <section id="rsvp" className="rsvp">
    <h2>RSVP</h2>
      <div id="bottom-buffer" className="bottom-buffer">
        <div id="rsvp-form-container" className='rsvp-form-container'>
          <GetParty setSubmitted={setSubmitted} familyGroup={familyGroup} setFamilyGroup={setFamilyGroup} invitees={invitees} setRsvpCommitted={setRsvpCommitted} />
        </div>
      </div>
      <ConfirmRSVPDetails submitted={submitted} setSubmitted={setSubmitted} familyGroup={familyGroup} setFamilyGroup={setFamilyGroup} rsvpCommitted={rsvpCommitted} setRsvpCommitted={setRsvpCommitted} />
    </section>
  )
}

function ConfirmRSVPDetails( {submitted, familyGroup, setFamilyGroup, setSubmitted, rsvpCommitted, setRsvpCommitted } ) {

  const confirmDetailsStyle = {
    position: 'absolute',
    top: window.scrollY + 'px',
    left: '0',
    width: '100vw',
    height: '100vh',
    background: 'rgba(15, 15, 15, .9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '10000'
  }

  if (!submitted) {
    return null
  }

  if (rsvpCommitted) {
    return (
      <div style={confirmDetailsStyle}>
        <ShowDetails familyGroup={familyGroup} setRsvpCommitted={setRsvpCommitted} setSubmitted={setSubmitted} />
      </div>
    )
  }

  return (
    <div style={confirmDetailsStyle}>
      <EnterDetailsRadio setRsvpCommitted={setRsvpCommitted} familyGroup={familyGroup} setFamilyGroup={setFamilyGroup} setSubmitted={setSubmitted} />
    </div>
  )
}

export default RSVPform