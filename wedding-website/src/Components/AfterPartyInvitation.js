import Link from 'next/link'

function AfterPartyInvitation() {

    return (
        <>
            <div className="after-invitation-holder">
                <Link href='/'>
                    <img
                        src="/images/after-party-invitation.png"
                        alt="after party invitation"
                        className="after-party-invitation"
                    />
                </Link>
            </div>
            {/* <div className="rsvp-link-container">
                <Link href='/'>
                    <a className="rsvp-link">View details and RSVP here</a>
                </Link>
                <div className="rsvp-link-veil"></div>
            </div> */}
        </>
    )
}

export default AfterPartyInvitation
