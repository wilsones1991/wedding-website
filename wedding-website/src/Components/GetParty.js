import { useState } from 'react'

const LastNameRequest = ({formData, setNeedFirstName, setFamilyGroup, invitees, setFormData, renderConfirm, needFirstName }) => {
    
    const handleLastNameChange = (event) => {
        setFormData({...formData, lastName: event.target.value})
      }
    
    const handleLastNameSubmit = () => {
        const lastName = new RegExp(formData.lastName, 'i')
        const invitee = invitees.filter(i => lastName.test(i.lastName))
        if (invitee.length > 1) {
            setFamilyGroup(invitee)
            setNeedFirstName(true)
            return
        }
        renderConfirm(invitee[0])
    }
    
    return (
        <form id="get-party card" className="get-party">
        <div id="get-name">
            <label htmlFor="name">What is the last name on the invitation?</label>
            <div className="input-container">
                <input value={formData.lastName} type="text" name="name" onChange={handleLastNameChange} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    handleLastNameSubmit()
                }
                }}></input>
                {needFirstName ? null : <button type="button" className="button button-primary" onClick={handleLastNameSubmit}>Submit</button>}
            </div>
        </div>
    </form>
    )
}

const FirstNameRequest = ({formData, renderConfirm, setFormData, familyGroup, setNeedFirstName, handleLastNameSubmit, needFirstName, setNameMatchFailed}) => {
    
    const handleFirstNameChange = (event) => {
        setFormData({...formData, firstName: event.target.value})
      }
    
    const handleFirstNameSubmit = () => {
        const firstName = new RegExp(formData.firstName, 'i')
        const lastName = new RegExp(formData.lastName, 'i')
        const invitee = familyGroup.filter(i => lastName.test(i.lastName)).filter(i => firstName.test(i.firstName))
        console.log(invitee)
        if (invitee.length > 0) {
            setNeedFirstName(false)
            console.log(invitee[0])
            renderConfirm(invitee[0])
        } else {
            setNameMatchFailed(true)
        }
        
    }

    if (needFirstName) {
        return (
            <form id="get-first-name" className="get-party">
            <div id="get-first-name">
                <label htmlFor="name">What is the first name on the invitation?</label>
                <div className="input-container">
                    <input value={formData.firstName} type="text" name="name" onChange={handleFirstNameChange} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        handleLastNameSubmit()
                    }
                    }}></input>
                    <button type="button" className="button button-primary" onClick={handleFirstNameSubmit}>Submit</button>
                </div>
            </div>
        </form>
        )
    }
    return null
}

function GetParty({ invitees, familyGroup, setFamilyGroup, setSubmitted, setRsvpCommitted }) {
    
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: ''
      })
    const [needFirstName, setNeedFirstName] = useState(false)
    const [nameMatchFailed, setNameMatchFailed] = useState(false)

    const renderConfirm = (invitee) => {
        const group = invitees.filter(i => i.groupID === invitee.groupID)
        setFamilyGroup(group)
        if (group.some(person => person.rsvp === "")) {
            setRsvpCommitted(false)
        } else {
            setRsvpCommitted(true)
        }
        setSubmitted(true)
        document.querySelector('body').style.cssText = `overflow: hidden;`
    }

    return (
        <div>
            <LastNameRequest formData={formData} renderConfirm={renderConfirm} setNeedFirstName={setNeedFirstName} setFamilyGroup={setFamilyGroup} invitees={invitees} setFormData={setFormData} needFirstName={needFirstName} />
            <FirstNameRequest formData={formData} setFormData={setFormData} familyGroup={familyGroup} setNeedFirstName={setNeedFirstName} setFamilyGroup={setFamilyGroup} renderConfirm={renderConfirm} needFirstName={needFirstName} setNameMatchFailed={setNameMatchFailed} />
        </div>
        
    )
}


export default GetParty

