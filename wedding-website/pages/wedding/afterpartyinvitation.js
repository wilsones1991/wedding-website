import Head from 'next/head'
import AfterPartyInvitation from '../../src/Components/AfterPartyInvitation'
import RSVPform from '../../src/Components/RSVPform'

export default function AfterPartyInvitationPage({ editRsvpGroup, setEditRsvpGroup }) {
    return (
        <>
            <Head>
                <title>Kylie and Eric's Wedding Invitation</title>
            </Head>
            <AfterPartyInvitation />
            <RSVPform
                editRsvpGroup={editRsvpGroup}
                setEditRsvpGroup={setEditRsvpGroup}
                afterParty={true}
            />
        </>
    )
}