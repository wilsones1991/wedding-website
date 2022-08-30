import '../styles/global.css'
import Head from 'next/head'
import React, { useState } from 'react'

export default function App({ Component, pageProps }) {
    const [editRsvpGroup, setEditRsvpGroup] = useState([])

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Component
                {...pageProps}
                editRsvpGroup={editRsvpGroup}
                setEditRsvpGroup={setEditRsvpGroup}
            />
        </>
    )
}
