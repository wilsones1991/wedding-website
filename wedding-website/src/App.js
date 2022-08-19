import Header from './Components/header'
import Navbar from './Components/navbar'
import Main from './Components/main'
import RSVPform from './Components/RSVPform'
import Carousel from './Components/carousel'
import './App.css'
import { useEffect } from 'react'

function App() {
  
  useEffect(() => {

    const navbar = document.querySelector(".navbar")
    const navBackground = document.querySelector(".nav-background")
    const docHeight = document.body.clientHeight
    const sticky = navbar.offsetTop

    navBackground.style.transform = "translateY(-" + sticky + "px)"
    navBackground.style.height = docHeight + "px"

    const handleScroll = () => {
        if (window.pageYOffset > sticky) {
            navbar.classList.add("sticky")
            navBackground.style.transform = "translateY(-" + window.pageYOffset + "px)"
        } else {
            navbar.classList.remove("sticky")
        }
    }

    window.onscroll = () => (handleScroll())
  }, [])
  
    return (
    <div>
      <Header />
      <Navbar />
      <Carousel />
      <Main />
      <RSVPform />
    </div>
    
  );
}

export default App;
