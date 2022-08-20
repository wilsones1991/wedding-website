import { useState } from 'react'

function GetParty({ invitees, setFamilyGroup, setSubmitted}) {
    
    const [formData, setFormData] = useState({
        lastName: ''
      })

    const renderConfirm = (invitee) => {
    const form = document.getElementById("rsvp-form-container")
    form.classList.add('animate')
    form.addEventListener('transitionend', () => {
        // Add condition to only run this event listener if it's the collapse one.
        const getName = document.getElementById("get-name")
        if (getName) {
            getName.remove()
            setSubmitted(true)
            setFamilyGroup(invitees.filter(i => i.groupID === invitee.groupID))
            form.classList.add('expand')
            form.setAttribute('style', 'overflow: visible;')
        }
    })
    }

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
                    <button type="button" className="button button-primary" onClick={handleLastNameSubmit}>Submit</button>
                </div>
            </div>
        </form>
    )
}

export default GetParty

