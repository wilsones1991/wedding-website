import { useState, useEffect } from 'react'
import GetParty from './GetParty'
import EnterDetails from './EnterDetails'
import EnterDetailsRadio from './EnterDetailsRadio'
import ShowDetails from './ShowDetails'

function RSVPform() {
  
  const [invitees, setInvitees] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [familyGroup, setFamilyGroup] = useState([])

  useEffect(() => {
    fetch('api')
      .then((res) => res.json())
      .then((data) => {
        setInvitees(data)
      })
      .catch(error => console.log(error))
  })

  return (
    <section id="rsvp">
    <h2>RSVP</h2>
      <div id="bottom-buffer" className="bottom-buffer">
        <div id="rsvp-form-container" className='rsvp-form-container'>
          <GetParty setSubmitted={setSubmitted} setFamilyGroup={setFamilyGroup} invitees={invitees} />
          <ConfirmRSVPDetails submitted={submitted} familyGroup={familyGroup} setFamilyGroup={setFamilyGroup} />
        </div>
      </div>
    </section>
  )
}

function ConfirmRSVPDetails( {submitted, familyGroup, setFamilyGroup } ) {

  const [responseLoaded, setResponseLoaded] = useState(null)

  return !submitted ? null : !responseLoaded ? <EnterDetailsRadio responseLoaded={responseLoaded} setResponseLoaded={setResponseLoaded} familyGroup={familyGroup} setFamilyGroup={setFamilyGroup} /> : <ShowDetails familyGroup={familyGroup} setResponseLoaded={setResponseLoaded} />
}

export default RSVPform