import Head from 'next/head'

import Header from '../src/Components/header'
import Navbar from '../src/Components/navbar'
import Main from '../src/Components/main'
import RSVPform from '../src/Components/RSVPform'
import Carousel from '../src/Components/carousel'
import Footer from '../src/Components/Footer'
import React, { useEffect } from 'react'

export default function App({ editRsvpGroup, setEditRsvpGroup }) {
    useEffect(() => {
        const stickyNavbar = () => {
            const navbar = document.querySelector('.navbar')
            const navBackground = document.querySelector('.nav-background')
            const docHeight = document.body.clientHeight
            const sticky =
                window.pageYOffset + navbar.getBoundingClientRect().top

            navBackground.style.transform = 'translateY(-' + sticky + 'px)'
            navBackground.style.height = docHeight + 'px'

            const handleScroll = () => {
                if (window.scrollY > sticky + 5) {
                    navbar.classList.add('sticky')
                    navBackground.style.transform =
                        'translateY(-' + window.scrollY + 'px)'
                    navBackground.style.zIndex = 0
                } else {
                    navbar.classList.remove('sticky')
                    navBackground.style.zIndex = -100
                }
            }
            window.addEventListener('scroll', handleScroll)
        }

        setTimeout(stickyNavbar, 500)
    }, [])

    return (
        <>
            <Head>
                <title>Kylie and Eric's Wedding</title>
            </Head>
            <Header />
            <Navbar />
            <Carousel />
            <Main />
            {/* <RSVPform
                editRsvpGroup={editRsvpGroup}
                setEditRsvpGroup={setEditRsvpGroup}
            /> */}
            <Footer />
        </>
    )
}
