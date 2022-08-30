import React, { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default class Carousel extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 10000,
            pauseOnFocus: true
        }
        return (
            <div className="slider">
                <Slider {...settings}>
                    {/* <h1>Test 1</h1> */}
                    <img
                        className="carousel"
                        src="/images/kylie-eric-1.jpeg"
                        alt=""
                    />
                    {/* <h1>Test 2</h1> */}
                    <img
                        className="carousel"
                        src="/images/big-sur.jpeg"
                        alt=""
                    />
                    {/* <h1>Test 3</h1> */}
                    <img
                        className="carousel"
                        src="/images/bend-biking.jpeg"
                        alt=""
                    />
                    {/* <h1>Test 4</h1> */}
                    <img
                        className="carousel"
                        src="/images/shasta-skiing.jpeg"
                        alt=""
                    />
                    {/* <h1>Test 5</h1> */}
                    <img className="carousel" src="/images/Maui.jpeg" alt="" />
                    <img
                        className="carousel"
                        src="/images/Yosemite.jpeg"
                        alt=""
                    />
                    <img
                        className="carousel"
                        src="/images/Sam's House.jpeg"
                        alt=""
                    />
                </Slider>
            </div>
        )
    }
}
