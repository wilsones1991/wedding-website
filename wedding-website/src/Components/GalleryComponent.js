import React, {useState, useEffect} from 'react';

export default function Gallery() {

    const [images, setImages] = useState([]);
    const [imageIndex, setImageIndex] = useState(null);

    const closeupStyle = "position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(15, 15, 15, .9);display: flex;flex-direction:column;justify-content: center;align-items: center;z-index: 1000000;overflowY: hidden;"

    useEffect(() => {
        fetch("https://wedding-website-server-360220.wl.r.appspot.com/api/gallery")
            .then((response) => response.json())
            .then((images) => {
                setImages(images.images)
            })  
    },[]);

    function handleCloseClick() {
        const closeup = document.querySelector(".closeupView");
        closeup.setAttribute("style", "display:none");
    }

    function handleLeftClick() {
        if (imageIndex === 0) {
            setImageIndex(images.length - 1);
        } else {
            setImageIndex(imageIndex - 1);
        }
    }

    function handleRightClick() {
        if (imageIndex >= images.length - 1) {
            console.log("yes");
            setImageIndex(0);
        } else {
            setImageIndex(imageIndex + 1);
        }
    }

    function handleImgClick(index) {
        setImageIndex(index);
        const closeup = document.querySelector(".closeupView");
        closeup.setAttribute("style", closeupStyle);
    }

    function getImageUploader(index) {
        return images[index]?.match(/^\S+\s(.+)\.\w+$/)[1] ?? "";
    }
    // function handleMouseEnter(e) {
    //     const caption = e.target.nextSibling
    //     caption.setAttribute("style", "display:block;")
    // }

    // function handleMouseLeave(e) {
    //     const caption = e.target.nextSibling
    //     caption.setAttribute("style", "display:none;")
    // }

    return (
        <>
            <div className="gallery">
                {images.map((image, index) => {
                    return (
                    <div className="galleryImage" key={index}>
                        <div className="imgWrapper">
                            <img className="galleryActualImg" src={"https://wedding-website-server-360220.wl.r.appspot.com/wedding-images/" + image} onClick={() => handleImgClick(index)} />
                            <p className="caption">Uploaded by {getImageUploader(index)}</p>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div className="closeupView">
                <div className="closeupCarousel">
                    <button className="galleryButton closeGallery" onClick={handleCloseClick}>X</button>
                    <button className="galleryButton leftArrow" onClick={handleLeftClick}>&lt;</button>
                    <div className="galleryImgContainer">
                        <img src={"https://wedding-website-server-360220.wl.r.appspot.com/wedding-images/" + images[imageIndex]} />
                    </div>
                    <button className="galleryButton rightArrow" onClick={handleRightClick}>&gt;</button>
                </div>
                <div className="imgMetadata">
                    <div>
                        <p className="closeUpCaption">Uploaded by {getImageUploader(imageIndex)}</p>
                    </div>
                    <div>
                        <p className="imgCount">Image {imageIndex + 1} of {images.length}</p>
                    </div>
                </div>
            </div>
            
        </>
    )
}