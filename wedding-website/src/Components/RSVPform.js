import React, { useState, useEffect } from 'react'
import GetParty from './GetParty'

import EnterDetailsRadio from './EnterDetailsRadio'
import ShowDetails from './ShowDetails'

function RSVPform({ editRsvpGroup, setEditRsvpGroup }) {
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
        const group = invitees.filter((i) => i.groupID === invitee.groupID)
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
                    data.then((data) => {
                        const newData = [...data.invitees]
                        newData.forEach((person) => (person.rsvp = ''))
                        setInvitees(newData)
                    })
                })
                .catch((error) => console.log(error))
        } else {
            setShowRsvpDetails(true)
            setFamilyGroup(editRsvpGroup)
            setSubmitted(true)
            setFormData((f) => ({ ...f, email: editRsvpGroup[0].email }))
            document.querySelector('html').style.overflow = 'hidden'
            document.querySelector('body').style.overflow = 'hidden'
        }
    }, [editRsvpGroup])

    const handleClose = () => {
        setSubmitted(false)
        setRsvpCommitted(false)
        setShowRsvpDetails(false)
        setFamilyGroup((f) => {
            f.forEach((person) => (person.rsvp = ''))
            return f
        })
        if (editRsvpGroup && editRsvpGroup.length > 0) {
            setEditRsvpGroup([])
        }
        document.querySelector('body').style.cssText = `overflow: visible;`
        document.querySelector('html').style.overflow = 'visible'
        setFormData((f) => ({
            ...f,
            firstName: '',
            lastName: '',
            email: '',
            comments: ''
        }))
    }

    const enterDetailsRadio = (
        <EnterDetailsRadio
            familyGroup={familyGroup}
            setFamilyGroup={setFamilyGroup}
            rsvpCommitted={rsvpCommitted}
            formData={formData}
            setFormData={setFormData}
            showRsvpDetails={showRsvpDetails}
            setRsvpCommitted={setRsvpCommitted}
            handleClose={handleClose}
        />
    )

    const showDetails = (
        <ShowDetails
            familyGroup={familyGroup}
            setRsvpCommitted={setRsvpCommitted}
            handleClose={handleClose}
        />
    )

    return (
        <section id="rsvp" className="rsvp">
            <h2>RSVP</h2>
            {/* <p className="centeredParagraph">Please RSVP by November 1st.</p> */}
            <div id="bottom-buffer" className="bottom-buffer">
                <div id="rsvp-form-container" className="rsvp-form-container">
                    <GetParty
                        familyGroup={familyGroup}
                        setFamilyGroup={setFamilyGroup}
                        invitees={invitees}
                        formData={formData}
                        setFormData={setFormData}
                        renderConfirm={renderConfirm}
                    />
                </div>
            </div>
            <ConfirmRSVPDetails
                submitted={submitted}
                rsvpCommitted={rsvpCommitted}
                enterDetailsRadio={enterDetailsRadio}
                showDetails={showDetails}
            />
        </section>
    )
}

function ConfirmRSVPDetails({
    submitted,
    rsvpCommitted,
    enterDetailsRadio,
    showDetails
}) {
    const confirmDetailsStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
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
        return <div style={confirmDetailsStyle}>{showDetails}</div>
    }
    return <div style={confirmDetailsStyle}>{enterDetailsRadio}</div>
}

export default RSVPform
