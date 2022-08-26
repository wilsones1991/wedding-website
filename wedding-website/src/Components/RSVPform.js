import { useState, useEffect } from 'react'
import GetParty from './GetParty'
import EnterDetailsRadio from './EnterDetailsRadio'
import ShowDetails from './ShowDetails'

function RSVPform({editRsvpGroup, setEditRsvpGroup}) {

  const [invitees, setInvitees] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [familyGroup, setFamilyGroup] = useState([])
  const [rsvpCommitted, setRsvpCommitted] = useState(false)
  const [showRsvpDetails, setShowRsvpDetails] = useState(false)
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    comments: ''
  })

  const renderConfirm = (invitee) => {
    const group = invitees.filter(i => i.groupID === invitee.groupID)
    setFamilyGroup(group)
    setSubmitted(true)
    document.querySelector('html').style.overflow = 'hidden'
    document.querySelector('body').style.overflow = 'hidden'
}

  useEffect(() => {
    if (editRsvpGroup.length === 0) {
      fetch('https://wedding-website-server-360220.wl.r.appspot.com/api')
      .then((res) => {
        const data = res.json()
        data.then(data => {
          const newData = [...data.invitees]
          newData.forEach(person => person.rsvp = '' )
          setInvitees(newData)
        })
      })
      .catch(error => console.log(error))
    }
    else {
      setShowRsvpDetails(true)
      setFamilyGroup(editRsvpGroup)
      setSubmitted(true)
      document.querySelector('html').style.overflow = 'hidden'
      document.querySelector('body').style.overflow = 'hidden'
    }
  },[editRsvpGroup])

  return (
    <section id="rsvp" className="rsvp">
    <h2>RSVP</h2>
      <div id="bottom-buffer" className="bottom-buffer">
        <div id="rsvp-form-container" className='rsvp-form-container'>
          <GetParty setSubmitted={setSubmitted} familyGroup={familyGroup} setFamilyGroup={setFamilyGroup} invitees={invitees} setRsvpCommitted={setRsvpCommitted} formData={formData} setFormData={setFormData} renderConfirm={renderConfirm} />
        </div>
      </div>
      <ConfirmRSVPDetails submitted={submitted} setSubmitted={setSubmitted} familyGroup={familyGroup} setFamilyGroup={setFamilyGroup} rsvpCommitted={rsvpCommitted} setRsvpCommitted={setRsvpCommitted} formData={formData} setFormData={setFormData} showRsvpDetails={showRsvpDetails} editRsvpGroup={editRsvpGroup} setEditRsvpGroup={setEditRsvpGroup} setShowRsvpDetails={setShowRsvpDetails} />
    </section>
  )
}

function ConfirmRSVPDetails( {submitted, familyGroup, setFamilyGroup, setSubmitted, rsvpCommitted, setRsvpCommitted, formData, setFormData, showRsvpDetails, editRsvpGroup, setEditRsvpGroup, setShowRsvpDetails} ) {

  const confirmDetailsStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    'bottom': '0',
    background: 'rgba(15, 15, 15, .9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '10000',
    overflowY: 'hidden'
  }

  if (!submitted) {
    return null
  }

  if (rsvpCommitted) {
    return (
      <div style={confirmDetailsStyle}>
        <ShowDetails familyGroup={familyGroup} setFamilyGroup={setFamilyGroup} setRsvpCommitted={setRsvpCommitted} setSubmitted={setSubmitted} setFormData={setFormData} editRsvpGroup={editRsvpGroup} setEditRsvpGroup={setEditRsvpGroup} setShowRsvpDetails={setShowRsvpDetails} />
      </div>
    )
  }

  return (
    <div style={confirmDetailsStyle}>
      <EnterDetailsRadio setRsvpCommitted={setRsvpCommitted} familyGroup={familyGroup} setFamilyGroup={setFamilyGroup} setSubmitted={setSubmitted} formData={formData} setFormData={setFormData} showRsvpDetails={showRsvpDetails} editRsvpGroup={editRsvpGroup} setEditRsvpGroup={setEditRsvpGroup} setShowRsvpDetails={setShowRsvpDetails}/>
    </div>
  )
}

export default RSVPform