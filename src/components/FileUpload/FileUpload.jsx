import React, { useRef, useState } from "react";
import Button from '../Button/Button';
import IconComponent from '../IconComponent/IconComponent';
import SWRHandler from "@/services/useSWRHook";
import axios from "axios";

const ProgressBar = ({ progress }) => {
  return (
    <div className="self-center relative h-[14px] w-[168px] bg-neutral-200 rounded-[20px] overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full bg-primary-700 transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

const FileUpload = ({
  className,
  label = "Unggah",
  maxSize = 5,
  onError = () => {},
  onSuccess = () => {},
  value = null,
  acceptedFormats = ['.jpg', '.jpeg', '.png'],
}) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef(null);

  const { useSWRMutateHook } = new SWRHandler();
  const { trigger: triggerUploadPhoto } = useSWRMutateHook(
    process.env.NEXT_PUBLIC_DEV_LINUX_API + 'v1/muatparts/product/photo',
    'POST',
    (url, arg) => {
      return axios({
        url,
        method: 'POST',
        data: arg,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
    }
  );

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size validation
    if (file.size > maxSize * 1024 * 1024) {
      onError('File size exceeds maximum limit');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setProgress(0);
      setIsUploading(true);
      const response = await triggerUploadPhoto(formData);
      
      if (response.data.Message.Code === 200) {
        onSuccess({
          url: response.data.Data.url,
          name: response.data.Data.name || file.name
        });
      }
    } catch (error) {
      onError(error);
    } finally {
      setProgress(0);
      setIsUploading(false);
      fileRef.current.value = null;
    }
  };

  const handleDelete = () => {
    onSuccess(null);
  };

  return (
    <div className={className}>
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept={acceptedFormats.join(',')}
        onChange={handleFileChange}
      />
      {value ? (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <span className="font-medium text-[12px] leading-[14.4px] text-success-400">{value.name}</span>
            {isUploading ? <ProgressBar progress={progress} /> : null}
          </div>
          <div className="flex items-center gap-4">
            <IconComponent
              src="/icons/silang.svg"
              onclick={handleDelete}
              classname="cursor-pointer"
            />
            <span 
              className="font-medium text-[12px] leading-[14.4px] text-primary-700 cursor-pointer"
              onClick={() => fileRef.current.click()}
            >
              Ubah File
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <Button
						Class="self-center"
            name="upload"
            color="primary"
            onClick={() => fileRef.current.click()}
          >
            {label}
          </Button>

          {isUploading ? (
            <div className="ml-4">
              <ProgressBar progress={progress} />
            </div>
          ) : (
            <div className="ml-2">
              <div className="text-[14px] leading-[16.8px] text-neutral-600">
                Format file {acceptedFormats.join('/')}
              </div>
              <div className="text-[14px] leading-[16.8px] text-neutral-600">
                maks {maxSize}MB
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;