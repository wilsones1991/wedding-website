import Link from 'next/link'
import { useEffect, useState } from 'react'

function Invitation() {
    const [enableLink, setEnableLink] = useState(false)

    useEffect(() => {
        const page = document.querySelector('.page-wrapper')
        const weddingInvitation = document.querySelector('.wedding-invitation')
        Promise.all(
            page.getAnimations().map((animation) => animation.finished)
        ).then(() => {
            setEnableLink(true)
            weddingInvitation.classList.add('allow-hover')
        })
    }, [])

    return (
        <>
            <div className="page-wrapper">
                <div className="envelope-wrapper">
                    <div className="envelope"></div>
                </div>
                <div className="envelope-background-wrapper">
                    <div className="envelope-flap-main background"></div>
                </div>
                <div className="envelope-inset-wrapper">
                    <div className="envelope-inset"></div>
                </div>
                <div className="envelope-inset-border-wrapper">
                    <div className="envelope-inset-border"></div>
                </div>
                <div className="envelope-flap-wrapper">
                    <div className="envelope-flap-border rotated rotated-border"></div>
                </div>
                <div className="envelope-flap-wrapper">
                    <div className="envelope-flap-main-top rotated rotated-main"></div>
                </div>
                <div className="little-middle-border"></div>
            </div>
            <div className="invitation-holder">
                <Link href={enableLink ? '/' : {}}>
                    <img
                        src="/images/wedding-invitation.jpeg"
                        alt="wedding invitation"
                        className="wedding-invitation"
                    />
                </Link>
            </div>
            <div className="rsvp-link-container">
                <Link href={enableLink ? '/' : {}}>
                    <a className="rsvp-link">View details and RSVP here</a>
                </Link>
                <div className="rsvp-link-veil"></div>
            </div>
        </>
    )
}

export default Invitation
