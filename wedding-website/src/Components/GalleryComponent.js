import React, {useState, useEffect} from 'react';
import Image from 'next/image';

export default function Gallery() {

    const [imageIndex, setImageIndex] = useState(null);

    const closeupStyle = "position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(15, 15, 15, .9);display: flex;flex-direction:column;justify-content: center;align-items: center;z-index: 1000000;overflowY: hidden;"

    function handleCloseClick() {
        const closeup = document.querySelector(".closeupView");
        closeup.setAttribute("style", "display:none");
        document.querySelector('html').style.overflow = 'visible';
        document.querySelector('body').style.overflow = 'visible';
    }

    function handleLeftClick() {
        if (imageIndex === 1) {
            setImageIndex(211);
        } else {
            setImageIndex(imageIndex - 1);
        }
    }

    function handleRightClick() {
        if (imageIndex >= 211) {
            setImageIndex(1);
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

    function setupIndexes() {
        const indexes = [];
        for (let index = 0; index < 211; index++) {
            indexes.push(index + 1);
        }
        return indexes;
    }

    function getPhotoCredit(index) {
        if (index <= 211) {
            return "Cat Fennell Photography";
        } else {
            return "Eric Wilson";
        }

    }

    return (
        <>
            <div className="gallery">
                {setupIndexes().map(index => {
                    return (
                    <div className="galleryImage" key={index}>
                        <Image className="galleryActualImg"
                        layout="fill"
                        src={`/images/gallery-images/gallery-photo-${index}.jpeg`}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcMWOeDwAFugIc9oXdhAAAAABJRU5ErkJggg=="
                        priority={index < 10 ? true : false}
                        quality={50}
                        onClick={() => handleImgClick(index)} />
                    </div>
                    )
                })}
            </div>
            <p>All photos by Cat Fennell</p>
            <p><a href="https://www.catfennell.com/">Cat Fennell Photography</a></p>
            <div className="closeupView">
                <div className="closeupCloseButtonContainer">
                    <button className="galleryButton closeGallery" onClick={handleCloseClick}>X</button>
                </div>
                <div className="closeupCarousel">
                    <button className="galleryButton leftArrow" onClick={handleLeftClick}>&lt;</button>
                    <div className="galleryImgContainer">
                        <Image
                            layout="fill"
                            src={`/images/gallery-images/gallery-photo-${imageIndex}.jpeg`}
                            className="closeupImage" />
                    </div>
                    <button className="galleryButton rightArrow" onClick={handleRightClick}>&gt;</button>
                </div>
                <div className="imgMetadata">
                    <div>
                        <p className="closeUpCaption">Photo Credit: {getPhotoCredit(imageIndex)}</p>
                    </div>
                    <div>
                        <p className="imgCount">Image {imageIndex + 1} of 211</p>
                    </div>
                </div>
            </div>

        </>
    )
}