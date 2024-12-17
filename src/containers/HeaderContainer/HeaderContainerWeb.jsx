import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./HeaderContainer.module.scss";
import Link from "next/link";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import IconComponent from "@/components/IconComponent/IconComponent";
import Image from "next/image";
import { headerProps } from "./headerProps";
import ModalComponent from "@/components/Modals/ModalComponent";
import { ResponsiveContext } from "@/common/ResponsiveContext";
import { ProfileHover, tips } from "./constanta";
import Bubble from "@/components/Bubble/Bubble";
import { authZustand } from "@/store/auth/authZustand";
import Button from "@/components/Button/Button";
const categories = [
  {
    icon: "/img/chopper.png",
    id: "939129dad",
    name: "One Piece",
    data: [
      { id: "ajd9dsa8jj", name: "Luffy" },
      { id: "ajd98eqwejj", name: "Zoro" },
      { id: "ajd98dasdjj", name: "Sanji" },
      { id: "ajd9das8jj", name: "Jinbe" },
    ],
  },
  {
    icon: "/img/facebook.png",
    id: "939134eqw29dad",
    name: "Company",
    data: [
      { id: "ajdy56y98jj", name: "Facebook" },
      { id: "ajd76u98jj", name: "Apple" },
      { id: "ajdg98rejj", name: "Samsung" },
      { id: "ajdrgegert98jj", name: "BYD" },
    ],
  },
];
function HeaderContainerWeb({ renderAppBar }) {
  const headerRef = useRef(null);
  const inputRef = useRef(null);
  const [getProfile, setProfile] = useState(ProfileHover);
  const [showCategory, setShowCategory] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showListLocation, setShowListLocation] = useState(false);
  const [getCategory, setCategory] = useState();
  const { setHeaderHeight } = headerProps();
  const {token} = authZustand()
  useEffect(() => {
    if (getProfile.length) {
      const newProfileUpdate = getProfile.map((val) => {
        if (val.title === "Favorit") val.badges = 3;
        if (val.title === "Diskusi") val.badges = 3;
        return val;
      });
      setProfile(newProfileUpdate);
    }
  }, []);
  useEffect(() => {
    if (headerRef?.current?.offsetHeight)
      setHeaderHeight?.(headerRef?.current?.offsetHeight);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className={style.main} ref={headerRef}>
      <ModalComponent
        classname={"!items-start "}
        classnameContent={
          "mt-1 mx-auto w-[1088px] ml-[5%] p-4 flex gap-4 h-full max-h-[296px]"
        }
        hideHeader
        isOpen={showCategory}
        setClose={() => setShowCategory(false)}
        showButtonClose={false}
      >
        {/* group category */}
        <ul className="w-[270px] list-none h-full ">
          {categories.map((val, i) => (
            <li key={i}>
              <div
                onClick={() => setCategory(val)}
                className={`${
                  getCategory?.id === val.id ? "bg-neutral-200" : ""
                } flex w-full justify-between items-center hover:bg-neutral-200 py-1 px-[10px] rounded-md cursor-pointer`}
              >
                <div className="flex items-center gap-3">
                  <Image width={24} height={24} src={val.icon} alt="chopper" />
                  <span className="font-medium text-xs text-neutral-900">
                    {val.name}
                  </span>
                </div>
                <IconComponent src={"/icons/chevron-right.svg"} />
              </div>
            </li>
          ))}
        </ul>
        {/* category */}
        <div className="pl-3 w-[578px] flex flex-col gap-3 h-full border-l border-neutral-400">
          {getCategory?.name && (
            <span className="font-bold text-sm text-neutral-900">
              Kategori {getCategory.name}
            </span>
          )}
          {getCategory?.name && (
            <span className="h-[1px] w-full bg-neutral-400"></span>
          )}
          <div className="grid grid-cols-2 gap-2 w-full pl-[10px] h-fit">
            {getCategory?.data?.map((val) => (
              <span
                className="w-50% font-medium text-xs text-neutral-900 cursor-pointer"
                key={val.id}
              >
                {val.name}
              </span>
            ))}
          </div>
        </div>
        {/* banner */}
        <Image width={176} height={264} src="/img/ads_category.png" />
      </ModalComponent>
      <ModalComponent
        hideHeader
        isOpen={showTips}
        setClose={() => setShowTips(false)}
      >
        <div className="mt-2 flex flex-col gap-4 w-[471px] h-fit py-6 px-5">
          <h1 className="text-base font-bold text-neutral-900 w-full text-center">
            Tips Pencarian
          </h1>
          <span className="font-medium text-neutral-600 text-xs">
            Temukan suku cadang yang tepat dengan kendaraan Anda. Anda dapat
            menerapkan kombinasi pencarian dari tips di bawah ini :{" "}
          </span>
          <div></div>
          <div className={`flex flex-col`}>
            {tips.map((val, i) => {
              if (i == 0)
                return (
                  <div key={i} className="w-full py-3 px-6 border-t border-neutral-400 flex ">
                    <span className="text-primary-700 text-xs font-bold w-1/2">
                      {val.left}
                    </span>
                    <span className="text-primary-700 text-xs font-bold w-1/2">
                      {val.right}
                    </span>
                  </div>
                );
              if (i == tips.length - 1)
                return (
                  <div key={i} className="w-full py-3 px-6 border-y border-neutral-400 flex ">
                    <span className="text-neutral-900 text-[10px] font-medium w-1/2">
                      {val.left}
                    </span>
                    <span className="text-neutral-900 text-[10px] font-medium w-1/2">
                      {val.right}
                    </span>
                  </div>
                );
              return (
                <div key={i} className="w-full py-3 px-6 border-t border-neutral-400 flex ">
                  <span className="text-neutral-900 text-[10px] font-medium w-1/2">
                    {val.left}
                  </span>
                  <span className="text-neutral-900 text-[10px] font-medium w-1/2">
                    {val.right}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </ModalComponent>
      <ModalComponent hideHeader isOpen={showLocation} setClose={()=>{
        setShowLocation(false)
        setShowListLocation(false)
        }}>
        <div className="py-6 px-4 flex flex-col gap-6">
          {token?<h1 className="font-bold text-base text-neutral-900">Pilih Alamat Tujuan</h1>:<h1 className="font-bold text-base text-neutral-900">Ke mana pesanan mau dikirim?</h1>}
          {token?
          <div className="flex flex-col gap-4">
            <Input placeholder="Cari nama alamat yang disimpan" focusEvent={()=>setShowListLocation(true)} icon={{left:'icons/search.svg'}} />
            <ul className="flex flex-col list-none gap-2">
              <li>
                <div className="bg-primary-50 p-3 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-neutral-900 font-bold">Gudang Bumi Cipta Karya</span>
                      <span className="rounded p-1 bg-primary-700 text-neutral-50 text-xs font-semibold">Utama</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xs text-primary-700">Ubah</span>
                      <IconComponent src={'/icons/pencil-blue.svg'} />
                    </div>
                  </div>
                  <div className="flex justify-between h-auto relative">
                    <div className="flex flex-col gap-3 w-[60%]">
                      <span className="font-medium text-[10px] text-neutral-900">Joko (0811-2312-3123)</span>
                      <span className="font-medium text-[10px] text-neutral-900">Jl. Pahlawan no. 18, Kota Kediri, Jawa Timur, 61665</span>
                      <span className="font-medium text-[10px] text-neutral-900">Detail Alamat : Gudang Bumi Cipta Jaya</span>
                    </div>
                    <Button Class="absolute right-0 bottom-0" disabled>Terpilih</Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          :<><div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-neutral-900">Masukkan alamat/kelurahan/kota pengiriman kamu</p>
            <div className="relative">
              <Input placeholder="Cari Lokasi Kamu" focusEvent={()=>setShowListLocation(true)} icon={{left:'icons/search.svg'}} />
              {showListLocation&&<ul className="absolute top-9 left-0 list-none bg-neutral-50 rounded-md shadow-xl w-full py-2 px-[10px] flex flex-col gap-4 border border-neutral-300">
                <li>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 cursor-pointer text-neutral-900 font-medium text-xs" onClick={()=>{
                      setShowListLocation(false)
                    }}>
                      <IconComponent src={"/icons/marker-outline.svg"} />
                      <span className="w-full line-clamp-1 cursor-pointer">Lokasi belum integrasi</span>
                    </div>
                    <span className="cursor-pointer" onClick={()=>{
                      setShowListLocation(false)
                    }}>
                      <IconComponent src={"/icons/bookmark-outline.svg"} />
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-neutral-900 font-medium text-xs" onClick={()=>{
                      setShowListLocation(false)
                    }}>
                      <IconComponent src={"/icons/marker-outline.svg"} />
                      <span className="w-full line-clamp-1">Lokasi belum integrasi</span>
                    </div>
                    <span onClick={()=>{
                      setShowListLocation(false)
                    }}>
                      <IconComponent src={"/icons/bookmark-outline.svg"} />
                    </span>
                  </div>
                </li>
              </ul>}
            </div>
          </div>
          <span className='w-full gap-3 flex item-center justify-between'>
              <span className='bg-neutral-400 w-full h-[1px] self-center'></span>
              <span className='text-neutral-400 text-xs'>atau</span>
              <span className='bg-neutral-400 w-full h-[1px] self-center'></span>
          </span>
          <span className="text-xs font-medium text-neutral-900"><span className="text-primary-400">Masuk</span> untuk melihat alamat yang telah kamu simpan</span></>}
        </div>
      </ModalComponent>
      {
        <>
          {!renderAppBar && (
            <div className="w-full h-9 bg-[#c22716] py-2 flex ">
              <div className="w-full max-w-7xl mx-auto px-10 flex justify-between">
                <div className="flex items-center gap-2 cursor-pointer group relative">
                  <Image
                    src={"/icons/phone.svg"}
                    width={10}
                    height={10}
                    alt="phone"
                  />
                  <p className="text-neutral-50 font-semibold  text-xs pt-[1px]">
                    Download muatmuat
                  </p>
                  <div className="hidden absolute group-hover:flex top-2 left-0 pt-4 cursor-default">
                    <div className="bg-white rounded-xl w-[352px] h-[156px] shadow-xl z-[90] overflow-hidden gap-3 flex p-4">
                      <Image
                        width={132}
                        height={132}
                        src={"/img/barcode.png"}
                        alt="barcode"
                      />
                      <div className="flex flex-col gap-4">
                        <span className="text-neutral-900 text-sm font-semibold">
                          Scan QR atau download app dari :{" "}
                        </span>
                        <Link
                          href={"https://muatmuat.com/register/download_apps"}
                        >
                          <Image
                            width={98}
                            height={28}
                            alt="playstore"
                            src={"/img/GooglePlay.png"}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Link
                    href={"/"}
                    className="text-neutral-50 font-medium  text-xs pt-[1px]"
                  >
                    Kembali ke muatmuat
                  </Link>
                  <Link
                    href={"/"}
                    className="text-neutral-50 font-medium  text-xs pt-[1px]"
                  >
                    Pusat bantuan
                  </Link>
                  <Link href={"/"} className="flex gap-1">
                    <Image
                      src={"/icons/store.svg"}
                      width={14}
                      height={14}
                      alt="store"
                    />
                    <p className="text-neutral-50 font-medium  text-xs pt-[1px]">
                      Seller/Partenr Center
                    </p>
                  </Link>
                  <div className="flex items-center gap-3 cursor-pointer group relative">
                    <Image
                      src={"/img/chopper.png"}
                      width={20}
                      height={20}
                      alt="profil"
                      className="rounded-full"
                    />
                    <span className="text-neutral-50 font-medium  text-xs w-[104px] line-clamp-1 mt-[1px]">
                      Ruben Coda S.I Terrrrr
                    </span>
                    <div className="hidden absolute group-hover:flex top-2 right-0 pt-4">
                      <div className="bg-white z-[91] w-[327px] p-4 cursor-default h-[192px] flex rounded-lg p4 divide-x-2 divide-neutral-500 shadow-xl">
                        <div className="flex flex-col gap-4 pr-3">
                          {getProfile.map((val,i) => {
                            return (
                              <Link
                                key={i}
                                href={val.url}
                                className="flex items-center justify-between gap-4 w-full"
                              >
                                <div className="flex items-center gap-[10px]">
                                  <Image
                                    width={16}
                                    height={16}
                                    src={val.icon}
                                    alt={val.title}
                                  />
                                  <span className="font-medium text-xs text-neutral-900">
                                    {val.title}
                                  </span>
                                </div>
                                {val.badges ? (
                                  <span className="w-4 h-4 bg-error-400 rounded-full flex justify-center items-center font-bold text-[6px] text-neutral-50">
                                    {val.badges}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Link>
                            );
                          })}
                        </div>
                        <div className="flex flex-col gap-4 pl-3">
                          <Link
                            href={"/"}
                            className="flex items-center gap-[10px]"
                          >
                            <Image
                              width={16}
                              height={16}
                              src={"/icons/user-outline.svg"}
                              alt="profile"
                            />
                            <span className="font-medium text-xs text-neutral-900">
                              Profile
                            </span>
                          </Link>
                          <Link
                            href={"/"}
                            className="flex items-center gap-[10px]"
                          >
                            <Image
                              width={16}
                              height={16}
                              src={"/icons/user-setting-outline.svg"}
                              alt="profile"
                            />
                            <span className="font-medium text-xs text-neutral-900">
                              Pengaturan Akun
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="w-full bg-primary-700 flex py-3  h-[80px]">
            {!renderAppBar ? (
              <div className="w-full max-w-7xl mx-auto flex items-center px-10 justify-between">
                <Link href="/" className="mr-4">
                  <Image
                    src="/icons/muatparts.svg"
                    width={136}
                    height={32}
                    alt="Logo"
                    className="h-8"
                  />
                </Link>
                <div></div>
                <Dropdown
                  classname={"!w-[164px]"}
                  options={[{ value: "all", name: "Semua Kategori" }]}
                />
                <div className="relative" ref={inputRef}>
                  <Input
                    placeholder="Cari Sparepart"
                    classname={style.inputSearch}
                    width={391}
                    icon={{
                      right: (
                        <IconComponent
                          src={"/icons/search.svg"}
                          classname={style.iconnSearch}
                        />
                      ),
                    }}
                    focusEvent={() => setShowSearch(true)}
                  />
                  <div className="absolute flex gap-4 -bottom-5 left-0">
                    <Link
                      href={"/"}
                      className="text-neutral-50 text-xs font-medium"
                    >
                      Ban Engkel
                    </Link>
                    <Link
                      href={"/"}
                      className="text-neutral-50 text-xs font-medium"
                    >
                      ACCU CDD
                    </Link>
                    <Link
                      href={"/"}
                      className="text-neutral-50 text-xs font-medium"
                    >
                      Tali
                    </Link>
                    <Link
                      href={"/"}
                      className="text-neutral-50 text-xs font-medium"
                    >
                      Spare Part Colt Diesel Double
                    </Link>
                  </div>
                  {/* yasha */}
                  {showSearch && (
                    <div
                      onBlur={() => setShowSearch(false)}
                      className="absolute w-full p-4 rounded-md h-auto max-h-[284px] bg-neutral-50 shadow-md"
                    >
                      <div className="flex flex-col gap-6 w-full h-full overflow-y-auto">
                        <div className="flex flex-col gap-3">
                          <div className="flex w-full justify-between items-center">
                            <p className="font-bold text-sm text-neutral-900">
                              Terakhir Dicari
                            </p>
                            <span className="font-bold text-[10px] text-error-400 cursor-pointer">
                              Hapus semua
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Bubble
                              iconRight={
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {}}
                                >
                                  <IconComponent
                                    src={"/icons/closes.svg"}
                                    width={12}
                                    height={12}
                                    classname={style.iconCloseBlack}
                                  />
                                </span>
                              }
                              classname="bg-warning-100 text-warning-900 border-none py-[6px] px-3 gap-1 font-semibold"
                            >
                              Test
                            </Bubble>
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-3">
                          <p className="font-bold text-sm text-neutral-900">
                            Promo yang paling banyak dicari
                          </p>
                          <Image
                            src={"/img/iklansearchnavbar.png"}
                            width={353}
                            height={140}
                            alt="banner"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <span
                  onClick={() => setShowTips(true)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Image
                    src="/icons/tips-white.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  <span className="text-neutral-50 text-[10px] font-medium">
                    Tips
                  </span>
                </span>

                <Link
                  href="/garasi"
                  className="flex items-center mr-4 bg-white p-2 rounded-md h-8"
                >
                  <Image
                    src="/icons/garasi.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  <span className="ml-2 text-neutral-900 text-xs font-medium">
                    Garasi Saya
                  </span>
                </Link>
                <div className="flex items-center gap-3">
                  <span className="relative cursor-pointer">
                    <Image
                      src={"/icons/cart.svg"}
                      width={24}
                      height={24}
                      alt="cart"
                    />
                    <span className="bg-error-500 border border-neutral-50 rounded-[30px] font-medium text-[8px] text-neutral-50 p-[2px] px-[6px] flex text-center absolute -top-[9px] -right-3 w-fit">
                      23
                    </span>
                  </span>
                  <span className="relative cursor-pointer">
                    <Image
                      src={"/icons/messages-header.svg"}
                      width={24}
                      height={24}
                      alt="cart"
                    />
                    <span className="bg-error-500 border border-neutral-50 rounded-[30px] font-medium text-[8px] text-neutral-50 p-[2px] px-[6px] flex text-center absolute -top-[9px] -right-3 w-fit">
                      23
                    </span>
                  </span>
                  <span className="relative cursor-pointer">
                    <Image
                      src={"/icons/notification-header.svg"}
                      width={24}
                      height={24}
                      alt="cart"
                    />
                    <span className="bg-error-500 border border-neutral-50 rounded-[30px] font-medium text-[8px] text-neutral-50 p-[2px] px-[6px] flex text-center absolute -top-[9px] -right-3 w-fit">
                      23
                    </span>
                  </span>
                </div>
                <div className="w-px h-8 bg-white mx-4" />

                <Link
                  href="/login"
                  className="px-6 py-2 bg-[#002C84] rounded-3xl text-neutral-50 text-sm font-semibold flex gap-1 whitespace-nowrap"
                >
                  <IconComponent src={"/icons/Plus.svg"} />
                  <p>Jual Produk</p>
                </Link>
              </div>
            ) : (
              renderAppBar
            )}
          </div>
          {!renderAppBar && (
            <div className="w-full flex h-8 bg-primary-700-red-500 bg-primary-700 ">
              <div className="w-full max-w-7xl mx-auto flex justify-between px-10 items-end">
                <div
                  className="w-[137px] h-7 bg-[#c22716] py-[6px] px-4 rounded-tr-md rounded-tl-md flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowCategory(!showCategory)}
                >
                  <IconComponent src={"/icons/kategori.svg"} />
                  <p className="font-semibold text-sm text-neutral-50">
                    Kategori
                  </p>
                  <IconComponent
                    classname={"chevron-white"}
                    src={"/icons/chevron-down.svg"}
                  />
                </div>
                <div
                  className=" w-auto max-w-[274px] h-7 bg-[#c22716] py-[6px] px-4 rounded-tr-md rounded-tl-md flex items-center cursor-pointer gap-2"
                  onClick={() => setShowLocation(!showLocation)}
                >
                  <IconComponent
                    classname={"chevron-white"}
                    src={"/icons/lokasi.svg"}
                    width={24}
                  />
                  <p className="font-semibold text-sm text-neutral-50 w-full max-w-[194px]">
                    Dikirim ke: Surabaya
                  </p>
                  <IconComponent
                    classname={"chevron-white"}
                    src={"/icons/chevron-down.svg"}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      }
    </header>
  );
}

export default HeaderContainerWeb;
