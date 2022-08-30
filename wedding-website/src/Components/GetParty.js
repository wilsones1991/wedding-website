import { useState, useEffect } from 'react'

function LastNameRequest({
    formData,
    setFormData,
    needFirstName,
    waitForData,
    handleNameSubmit
}) {
    const handleLastNameChange = (event) => {
        setFormData((f) => ({ ...f, lastName: event.target.value }))
    }

    return (
        <form
            id="get-party card"
            className="get-party"
            onSubmit={handleNameSubmit}
        >
            <div id="get-name">
                <label htmlFor="name">
                    What is the last name on the invitation?
                </label>
                <div className="input-container">
                    <input
                        id="last-name-input"
                        value={formData.lastName}
                        type="text"
                        name="name"
                        onChange={handleLastNameChange}
                    ></input>
                    {needFirstName ? null : (
                        <button
                            type="submit"
                            className="button button-primary"
                            disabled={formData.lastName === ''}
                        >
                            {waitForData ? 'Loading...' : 'Submit'}
                        </button>
                    )}
                </div>
            </div>
        </form>
    )
}

function FirstNameRequest({
    formData,
    setFormData,
    needFirstName,
    handleNameSubmit
}) {
    const handleFirstNameChange = (event) => {
        setFormData((f) => ({ ...f, firstName: event.target.value }))
    }

    if (needFirstName) {
        return (
            <form id="get-first-name" className="get-party">
                <div id="get-first-name">
                    <label htmlFor="name">
                        What is the first name on the invitation?
                    </label>
                    <div className="input-container">
                        <input
                            id="first-name-input"
                            value={formData.firstName}
                            type="text"
                            name="name"
                            autoFocus
                            onChange={handleFirstNameChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleNameSubmit()
                                }
                            }}
                        ></input>
                        <button
                            type="button"
                            className="button button-primary"
                            disabled={
                                formData.lastName === '' ||
                                formData.firstName === ''
                            }
                            onClick={handleNameSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        )
    }
    return null
}

function NoMatch({ nameMatchFailed }) {
    if (nameMatchFailed) {
        return (
            <div className="no-match">
                <p>
                    Hmm, we couldn't find a match for that name. Please try
                    again or email us at{' '}
                    <a
                        className="email-link"
                        href="mailto: wilsones1991@gmail.com"
                        target="_blank"
                    >
                        wilsones1991@gmail.com
                    </a>{' '}
                    to RSVP.
                </p>
            </div>
        )
    }
    return null
}

function GetParty({
    invitees,
    familyGroup,
    setFamilyGroup,
    editRsvpGroup,
    formData,
    setFormData,
    renderConfirm
}) {
    const [needFirstName, setNeedFirstName] = useState(false)
    const [nameMatchFailed, setNameMatchFailed] = useState(false)
    const [waitForData, setWaitForData] = useState(false)

    const processName = () => {
        setWaitForData(false)
        const lastName = new RegExp(formData.lastName.trim(), 'i')
        if (formData.firstName.length === 0) {
            const invitee = invitees.filter((i) => lastName.test(i.lastName))
            if (invitee.length > 1) {
                setFamilyGroup(invitee)
                setNameMatchFailed(false)
                setNeedFirstName(true)
                return
            }
            if (invitee.length === 0) {
                setNameMatchFailed(true)
                return
            }
            renderConfirm(invitee[0])
        } else {
            const firstName = new RegExp(formData.firstName.trim(), 'i')
            const invitee = familyGroup
                .filter((i) => lastName.test(i.lastName))
                .filter((i) => firstName.test(i.firstName))
            if (invitee.length > 0) {
                setNameMatchFailed(false)
                setNeedFirstName(false)
                renderConfirm(invitee[0])
            } else {
                setNameMatchFailed(true)
            }
        }
    }

    const handleNameSubmit = (event) => {
        event.preventDefault()
        if (formData.lastName === '') {
            return
        }
        if (invitees == null) {
            setWaitForData(true)
        } else {
            processName()
        }
    }

    useEffect(() => {
        if (invitees != null && waitForData) {
            processName()
        }
    })

    return (
        <div>
            <LastNameRequest
                formData={formData}
                setFormData={setFormData}
                needFirstName={needFirstName}
                waitForData={waitForData}
                handleNameSubmit={handleNameSubmit}
            />
            <FirstNameRequest
                formData={formData}
                setFormData={setFormData}
                setFamilyGroup={setFamilyGroup}
                needFirstName={needFirstName}
                handleNameSubmit={handleNameSubmit}
            />
            <NoMatch nameMatchFailed={nameMatchFailed} />
        </div>
    )
}

export default GetParty
