import { useHeader } from "@/common/ResponsiveContext";
import Bubble from "@/components/Bubble/Bubble";
import ButtonBottomMobile from "@/components/ButtonBottomMobile/ButtonBottomMobile";
import IconComponent from "@/components/IconComponent/IconComponent";

const Filter = ({
    // setIsOpen
}) => {
    const { clearScreen } = useHeader();
    const ratings = [5, 4, 3, 2, 1];

    return (
        <div className="containerMobile min-h-screen h-full bg-[#FCFCFC]">
            <div className="flex flex-col self-center w-full">
                <div className="flex flex-col w-full">
                <div className="flex gap-10 justify-between items-center w-full font-semibold">
                    <div className="self-stretch my-auto text-black">Bintang</div>
                </div>
                <div className="flex flex-wrap gap-2 items-start mt-4 w-full font-medium text-black">
                    {ratings.map((item, key) => (
                        <div key={key}>
                            <Bubble
                                classname={`border ${true?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`}
                                // on
                            >
                                <IconComponent
                                    src="/icons/star.svg"
                                    size={14}
                                    height={14}
                                />
                                <span>
                                    {`${item} Bintang`}
                                </span>
                            </Bubble>
                        </div>
                    ))}
                </div>
                </div>
            </div>
            <ButtonBottomMobile onClickLeft={() => clearScreen()} onClickRight={() => {}} textLeft={'Batal'} textRight={'Simpan'} />
        </div>
    );
};

export default Filter;