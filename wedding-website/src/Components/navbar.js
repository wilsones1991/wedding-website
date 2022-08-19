function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-buffer"></div>
            <div className="nav-main">
                <a href="#home" className="nav-link">Home</a>
                <a href="#the-story" className="nav-link">The Story</a>
                <a href="#details" className="nav-link">Details</a>
                <a href="#rsvp" className="nav-link">RSVP</a>
            </div>
            <div className="nav-buffer"></div>
            <div className="nav-background"></div>
        </nav>
    )
}

export default Navbar