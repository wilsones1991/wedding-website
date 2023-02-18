import React, {useState, useEffect} from 'react';
import Image from 'next/image';

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
        document.querySelector('html').style.overflow = 'visible';
        document.querySelector('body').style.overflow = 'visible';
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
        document.querySelector('html').style.overflow = 'hidden'
        document.querySelector('body').style.overflow = 'hidden'
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

    const imageLoader = ({ src, quality }) => {
        return `https://wedding-website-server-360220.wl.r.appspot.com/wedding-images/${src}?q=${quality || 75}`
      }

    return (
        <>
            <div className="gallery">
                {images.map((image, index) => {
                    if (image != undefined) {
                        console.log(image);
                        return (
                            <div className="galleryImage" key={index}>
                                <Image className="galleryActualImg"
                                layout="fill"
                                src={imageLoader({src: image})}
                                onClick={() => handleImgClick(index)} />
                                <p className="caption">Photo Credit: {getImageUploader(index)}</p>
                            </div>
                        )
                    }

                })}
            </div>
            <div className="closeupView">
                <div className="closeupCarousel">
                    <button className="galleryButton closeGallery" onClick={handleCloseClick}>X</button>
                    <button className="galleryButton leftArrow" onClick={handleLeftClick}>&lt;</button>
                    <div className="galleryImgContainer">
                        <img src={"https://wedding-website-server-360220.wl.r.appspot.com/wedding-images/" + images[imageIndex]} loading="lazy" />
                    </div>
                    <button className="galleryButton rightArrow" onClick={handleRightClick}>&gt;</button>
                </div>
                <div className="imgMetadata">
                    <div>
                        <p className="closeUpCaption">Photo Credit: {getImageUploader(imageIndex)}</p>
                    </div>
                    <div>
                        <p className="imgCount">Image {imageIndex + 1} of {images.length}</p>
                    </div>
                </div>
            </div>

        </>
    )
}