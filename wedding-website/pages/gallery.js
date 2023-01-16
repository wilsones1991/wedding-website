import React from 'react';

import Head from 'next/head'

import Header from '../src/Components/header'
import Navbar from '../src/Components/navbar'
import Footer from '../src/Components/Footer'
import GalleryComponent from '../src/Components/GalleryComponent'

export default function Gallery() {
    return (
        <>
            <Head>
                <title>Kylie and Eric's Wedding</title>
            </Head>
            <Header />
            <Navbar />
            <GalleryComponent />
            <Footer />
            
        </>
    )
}