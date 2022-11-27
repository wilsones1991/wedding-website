import Link from 'next/link'
import {useEffect} from 'react'

function AfterPartyInvitation() {

    useEffect(() => {
        const rsvpLink = document.querySelector(".rsvp-link")
        const afterPartyImg = document.querySelector(".after-invitation-holder")
        const rsvpInput = document.getElementById("last-name-input")

        rsvpLink.addEventListener("click", () => rsvpInput.focus())
        afterPartyImg.addEventListener("click", () => rsvpInput.focus())
    })
    return (
        <>
            <div className="after-invitation-holder">
                <a>
                    <img
                        src="/images/after-party-invitation.png"
                        alt="after party invitation"
                        className="after-party-invitation"
                    />
                </a>
            </div>
            <div className="details">
                <p>WINTER COZIEST ENCOURAGED!</p>
                <p>LOCAL BEER, CIDER AND N.A. OPTIONS AVAILABLE</p>
                <p>PIZZA ON US!</p>
            </div>
            <div className="rsvp-link-container">
                <a className="rsvp-link">RSVP here</a>
            </div>
        </>
    )
}

export default AfterPartyInvitation
