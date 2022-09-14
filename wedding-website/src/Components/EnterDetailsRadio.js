import LoadingSpinner from './LoadingSpinner'
import CloseButton from './CloseButton'
import { useEffect, useState } from 'react'

function EnterDetailsRadio({
    familyGroup,
    setFamilyGroup,
    setRsvpCommitted,
    formData,
    setFormData,
    showRsvpDetails,
    handleClose
}) {
    const [responseLoaded, setResponseLoaded] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [showEmailError, setShowEmailError] = useState('hidden')

    const handleDetailsClick = (e) => {
        e.preventDefault()
        if (disabled) return
        setResponseLoaded(false)
        const confirmDetailsWrapper = document.querySelector(
            '.rsvp-form-container'
        )
        confirmDetailsWrapper.classList.add('loading')
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ familyGroup })
        }
        fetch(
            'https://wedding-website-server-360220.wl.r.appspot.com/api',
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                setRsvpCommitted(true)
                setResponseLoaded(true)
                confirmDetailsWrapper.classList.remove('loading')
            })
        const emailRequestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ familyGroup })
        }
        fetch(
            'https://wedding-website-server-360220.wl.r.appspot.com/api/mail',
            emailRequestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    useEffect(() => {
        const radioResponses = familyGroup.map((person) => person.rsvp)
        if (
            !radioResponses.some((rsvp) => rsvp === '') &&
            validateEmail(formData.email)
        ) {
            setDisabled(false)
            return
        }
        setDisabled(true)
    }, [familyGroup, formData])

    const handleBlur = (e) => {
        if (!validateEmail(e.target.value)) {
            e.target.classList.add('warning')
            setShowEmailError('visible')
        }
    }

    const handleRadio = (event, index) => {
        const newFamilyGroup = [...familyGroup]
        newFamilyGroup[index].rsvp = event.target.value === 'yes' ? 'Yes' : 'No'

        setFamilyGroup(newFamilyGroup)
    }

    const handleCommentsChange = (event) => {
        const newFamilyGroup = [...familyGroup]
        newFamilyGroup.forEach(
            (person) => (person.comments = event.target.value)
        )
        setFamilyGroup(newFamilyGroup)
        setFormData({ ...formData, comments: event.target.value })
    }

    const handleEmailChange = (e) => {
        const newFamilyGroup = [...familyGroup]
        newFamilyGroup.forEach((person) => (person.email = e.target.value))
        setFamilyGroup(newFamilyGroup)
        setFormData({ ...formData, email: e.target.value })
        if (
            e.target.classList.contains('warning') &&
            validateEmail(e.target.value)
        ) {
            e.target.classList.remove('warning')
            setShowEmailError('hidden')
        }
    }

    return (
        <div className="confirm-details-wrapper">
            <div className="confirm-details card">
                <form onSubmit={handleDetailsClick}>
                    <legend>
                        Please confirm who will be attending the wedding.
                    </legend>
                    <div className="attendee-rsvp-container">
                        {familyGroup.map((person, index) => {
                            return (
                                <div
                                    className="attendee-rsvp"
                                    key={person.uniqueID}
                                >
                                    <span className="attendee">
                                        {person.firstName +
                                            ' ' +
                                            person.lastName}
                                    </span>
                                    <div className="radio-field">
                                        <input
                                            type="radio"
                                            id="yes"
                                            name={person.uniqueID}
                                            value="yes"
                                            checked={
                                                person.rsvp === 'Yes' || ''
                                                    ? true
                                                    : false
                                            }
                                            onChange={(e) =>
                                                handleRadio(e, index)
                                            }
                                        />
                                        <label htmlFor="yes">Yes</label>
                                    </div>
                                    <div className="radio-field">
                                        <input
                                            type="radio"
                                            id="no"
                                            name={person.uniqueID}
                                            value="no"
                                            checked={
                                                person.rsvp === 'No'
                                                    ? true
                                                    : false
                                            }
                                            onChange={(e) =>
                                                handleRadio(e, index)
                                            }
                                        />
                                        <label htmlFor="no">No</label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="email-container">
                        <label htmlFor="email">Email:</label>
                        <input
                            className="email-input"
                            type="email"
                            name="email"
                            value={
                                showRsvpDetails
                                    ? familyGroup[0].email
                                    : formData.email
                            }
                            onBlur={(e) => handleBlur(e)}
                            onChange={(e) => handleEmailChange(e)}
                        />
                    </div>
                    <p
                        className="helper-text"
                        style={{ visibility: showEmailError }}
                    >
                        Please enter a valid email address.
                    </p>
                    <label htmlFor="comments">Notes (optional):</label>
                    <textarea
                        id="comments"
                        className="comments"
                        name="comments"
                        rows="5"
                        value={
                            showRsvpDetails
                                ? familyGroup[0].comments
                                : formData.comments
                        }
                        onChange={(e) => handleCommentsChange(e)}
                    />
                    <button
                        type="submit"
                        className="button button-primary"
                        disabled={disabled}
                    >
                        {responseLoaded == null || responseLoaded === true ? (
                            'Submit'
                        ) : (
                            <LoadingSpinner />
                        )}
                    </button>
                    <CloseButton handleClose={handleClose} />
                </form>
            </div>
        </div>
    )
}

export default EnterDetailsRadio
