import HeaderMobile from "@/containers/HeaderContainer/HeaderContainerMobile";
import Button from "../Button/Button";
import Image from "next/image";
import toast from "@/store/toast";
import IconComponent from "../IconComponent/IconComponent";

const CropperReviewResponsive = ({
  src,
  title = "Upload Foto",
  setIsShowPreview,
  onConfirm = () => {},
  uploadOptions,
}) => {
  const { setShowBottomsheet, setTitleBottomsheet, setDataBottomsheet } =
    toast();

  const handleEditImage = () => {
    setShowBottomsheet(true);
    setTitleBottomsheet(" -");
    setDataBottomsheet(
      <div className="flex justify-around">
        {uploadOptions.map((option, key) => (
          <div className="flex flex-col gap-y-4 items-center" key={key}>
            <div
              className="p-5 bg-primary-700 cursor-pointer rounded-[50px] size-16"
              onClick={option.onClick}
            >
              <IconComponent src={option.src} size="medium" />
            </div>
            <span className="font-semibold text-[16px] leading-[19.2px]">
              {option.title}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute top-0 left-0 w-full h-screen z-[52] bg-white">
      <HeaderMobile onBack={() => setIsShowPreview(false)} title={title} />
      <div className="min-h-screen h-full flex flex-col items-center mt-[62px]">
        <div className="bg-[#cccccc] w-full aspect-square flex justify-center p-4">
          <div className="rounded-[900px] bg-neutral-50 overflow-hidden">
            <Image alt="preview" src={src} width={328} height={328} />
          </div>
        </div>
        <Button
          Class="h-10 px-6 mt-6"
          color="primary_secondary"
          onClick={handleEditImage}
        >
          Ubah Foto
        </Button>
        <div className="mt-3 font-medium text-[14px] leading-[16.8px] text-[#676767]">
          Max. size foto 10MB
        </div>
      </div>
      <div className="fixed bottom-0 left-0 bg-neutral-50 w-full py-3 px-4 shadow-muat">
        <Button
          Class="h-8 w-full max-w-full"
          color="primary"
          onClick={onConfirm}
        >
          Simpan Foto
        </Button>
      </div>
    </div>
  );
};

export default CropperReviewResponsive;
