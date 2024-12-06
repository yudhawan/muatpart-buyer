'use client'
import React, { useRef, useEffect } from "react";

//cropper
import Cropper, { ReactCropperElement } from "react-cropper";
import 'cropperjs/dist/cropper.css';
import './cropper_az.css';

//modal
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

export default function CropperImage({
    imageSource = '', 
    result, 
    isOpen, 
    setIsOpen, 
    onClose, 
    isCircle = false
}){
    const cropperRef = useRef(null);

    const getCropData = () => {
        if (typeof cropperRef.current.cropper !== "undefined") {
            result(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        }
        const cropper = cropperRef.current?.cropper;
        cropper.reset();
        setIsOpen(false);
    };

    const cancelCrop = () => {
        const cropper = cropperRef.current?.cropper;
        //cropper.clear();
        //fileRef.current.value = null;
        cropper.reset();
        setIsOpen(false);
        onClose(true);
    }

    const zoomOut = () => {
        const cropper = cropperRef.current?.cropper;
        cropper.zoom(-0.1);
    }

    const zoomIn = () => {
        const cropper = cropperRef.current?.cropper;
        cropper.zoom(0.1);
    }

    return(
        <>
            <Dialog id="modal1" open={isOpen} onClose={cancelCrop} className={`${isCircle && 'modal-cropper-circle'} relative z-10`}>
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center">
                    <DialogPanel
                        transition
                        className="px-[24px] py-[36px] w-[424px] bg-[white] rounded-[12px]"
                    >
                        <div className="bg-white flex flex-col gap-[18px] items-center mb-[24px]">
                            <span className="text-black">Ubah Foto Profil</span>
                            <div className="w-[386px] h-[386px] relative">
                                <div className="bg-[white] flex flex-col absolute right-[8px] bottom-[7.5px] border-[#E2E2E2] border-[1px] rounded-[12px] z-[100] h-[80px]">
                                    <div className="h-1/2 text-[25px] cursor-pointer text-[black] flex justify-center items-center" onClick={zoomIn}>
                                        +
                                    </div>
                                    <div className="h-1/2 text-[25px] cursor-pointer text-[black] flex justify-center items-center p-[15px]" onClick={zoomOut}>
                                        <div className="w-[12px] border-[1.25px] border-[#1B1B1B]">
                                        </div>
                                    </div>
                                </div>
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
                                    minCropBoxWidth={isCircle ? 386 : 0}
                                    //checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                    // crop={cropImage}
                                />
                                <div className="img-preview"/>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <button
                                type="button"
                                onClick={cancelCrop}
                                className="rounded-full bg-[white] border-[#176CF7] border-[1px] text-[#176CF7] px-[12px] py-[9px] min-w-[112px] h-[32px] flex items-center justify-center outline-none"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={getCropData}
                                className="rounded-full bg-[#176CF7] text-[white] px-[12px] py-[9px] min-w-[112px] h-[32px] flex items-center justify-center outline-none"
                            >
                                Simpan
                            </button>
                        </div>
                    </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}