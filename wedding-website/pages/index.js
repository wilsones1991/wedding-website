import Head from 'next/head'

import Header from '../src/Components/header'
import Navbar from '../src/Components/navbar'
import Main from '../src/Components/main'
import RSVPform from '../src/Components/RSVPform'
import Carousel from '../src/Components/carousel'
import Footer from '../src/Components/footer'
import React, { useEffect } from 'react'

export default function App({ editRsvpGroup, setEditRsvpGroup }) {
    useEffect(() => {
        const navbar = document.querySelector('.navbar')
        const navBackground = document.querySelector('.nav-background')
        const docHeight = document.body.clientHeight
        const sticky = navbar.offsetTop

        navBackground.style.transform = 'translateY(-' + sticky + 'px)'
        navBackground.style.height = docHeight + 'px'

        const handleScroll = () => {
            if (window.pageYOffset > sticky) {
                navbar.classList.add('sticky')
                navBackground.style.transform =
                    'translateY(-' + window.pageYOffset + 'px)'
            } else {
                navbar.classList.remove('sticky')
            }
        }

        window.onscroll = () => handleScroll()
    }, [])

    return (
        <>
            <Head>
                <title>Kylie and Eric&apos;s Wedding</title>
            </Head>
            <Header />
            <Navbar />
            <Carousel />
            <Main />
            <RSVPform
                editRsvpGroup={editRsvpGroup}
                setEditRsvpGroup={setEditRsvpGroup}
            />
            <Footer />
        </>
    )
}
