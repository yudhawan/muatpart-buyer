'use client'
import React, { useRef, useEffect, useState } from "react";

//cropper
import Cropper, { ReactCropperElement } from "react-cropper";
import 'cropperjs/dist/cropper.css';
import './cropper_az.css';
import style from "./CropperResponsive.module.scss";

import IconComponent from "../IconComponent/IconComponent";
import CropperReviewResponsive from "./CropperReviewResponsive";

export default function CropperResponsive({
    imageSource = '', 
    result, 
    isOpen, 
    setIsOpen, 
    onClose, 
    isCircle = false,
    previewTitle,
    uploadOptions,
    isShowPreview,
    setIsShowPreview
}){
    const cropperRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null)

    const getCropData = () => {
        if (typeof cropperRef.current.cropper !== "undefined") {
            setPreviewImage(cropperRef.current?.cropper.getCroppedCanvas().toDataURL())
        }
        const cropper = cropperRef.current?.cropper;
        cropper.reset();
        setIsShowPreview(true)
    };

    const cancelCrop = () => {
        const cropper = cropperRef.current?.cropper;
        cropper.reset();
        setIsOpen(false);
        onClose(true);
    }

    const handleConfirm = () => {
        result(previewImage)
        setIsShowPreview(false)
        setIsOpen(false)
    }

    if (!isOpen) {
        return null
    }

    if (isShowPreview) {
        return (
            <CropperReviewResponsive
                title={previewTitle}
                src={previewImage}
                setIsShowPreview={setIsShowPreview}
                onConfirm={handleConfirm}
                uploadOptions={uploadOptions}
            />
        )
    }

    return(
        <>
            <div className={`absolute top-0 left-0 w-full h-screen z-[51] bg-[#20242F]`}>
                <div className="flex flex-row justify-between p-4 pt-3">
                    <div className="flex flex-row gap-x-3">
                        {/* <button
                            onClick={() => setIsOpen(false)}
                        > */}
                            <IconComponent
                                classname={style.close_btn_icon}
                                src="/icons/silang.svg"
                                size="medium"
                                onclick={cancelCrop}
                            />
                        {/* </button> */}
                        <span className="font-medium text-[16px] leading-[19.2px] text-white">
                            Cropper
                        </span>
                    </div>
                    <IconComponent
                        // classname={style.close_btn_icon}
                        src="/icons/check_white.svg"
                        size="medium"
                        onclick={getCropData}
                    />
                </div>
                <div className="flex min-h-[600px]">
                    <div 
                        className={`w-full aspect-square m-auto
                            ${
                                isCircle ? "modal-cropper-circle" : ""
                            }   
                        `}
                    >
                        {/* <div className="bg-[white] flex flex-col absolute right-[8px] bottom-[7.5px] border-[#E2E2E2] border-[1px] rounded-[12px] z-[100] h-[80px]">
                            <div className="h-1/2 text-[25px] cursor-pointer text-[black] flex justify-center items-center" onClick={zoomIn}>
                                +
                            </div>
                            <div className="h-1/2 text-[25px] cursor-pointer text-[black] flex justify-center items-center p-[15px]" onClick={zoomOut}>
                                <div className="w-[12px] border-[1.25px] border-[#1B1B1B]">
                                </div>
                            </div>
                        </div> */}
                        <Cropper
                            ref={cropperRef}
                            style={{ height: "100%", width: "100%" }}
                            src={imageSource}
                            aspectRatio={1}
                            preview={'.img-preview'}
                            viewMode={0}
                            background={true}
                            responsive={true}
                            autoCropArea={1}
                            cropBoxResizable={true}
                            minCropBoxHeight={isCircle ? 386 : 0}
                            minCropBoxWidth={isCircle ? 300 : 0}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}