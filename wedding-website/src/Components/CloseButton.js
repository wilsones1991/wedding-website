function CloseButton({setSubmitted}) {
    
    const handleClick = () => {
        setSubmitted(false)
        document.querySelector('body').style.cssText = `overflow: visible;`
    }
    
    return (
        <button className="button close-button" onClick={handleClick}>X</button>
    )
}

export default CloseButton