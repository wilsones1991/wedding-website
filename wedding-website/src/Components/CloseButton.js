function CloseButton({ handleClose }) {
    return (
        <button
            type="button"
            className="button close-button"
            onClick={handleClose}
        >
            X
        </button>
    )
}

export default CloseButton
