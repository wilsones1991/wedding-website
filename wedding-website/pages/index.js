import Head from 'next/head'

import Header from '../src/Components/header'
import Navbar from '../src/Components/navbar'
import Main from '../src/Components/main'
import RSVPform from '../src/Components/RSVPform'
import Carousel from '../src/Components/carousel'
import Footer from '../src/Components/Footer'
import React, { useEffect, useLayoutEffect } from 'react'

export default function App({ editRsvpGroup, setEditRsvpGroup }) {
    useLayoutEffect(() => {
        if (document.readyState) {
            const getOffsetTop = (element) => {
                let offsetTop = 0
                while (element) {
                    offsetTop += element.offsetTop
                    element = element.offsetParent
                }
                return offsetTop
            }

            const navbar = document.querySelector('.navbar')
            const navBackground = document.querySelector('.nav-background')
            const docHeight = document.body.clientHeight
            const sticky = getOffsetTop(navbar)

            navBackground.style.transform = 'translateY(-' + sticky + 'px)'
            navBackground.style.height = docHeight + 'px'

            const handleScroll = () => {
                console.log(sticky)
                console.log(window.scrollY)
                if (window.scrollY > sticky) {
                    navbar.classList.add('sticky')
                    navBackground.style.transform =
                        'translateY(-' + window.scrollY + 'px)'
                    navBackground.style.zIndex = 0
                } else {
                    navbar.classList.remove('sticky')
                    navBackground.style.zIndex = -100
                }
            }
            window.onscroll = () => handleScroll()
        }
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
