import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

const MenuSection = ({ title, items }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-sm font-bold text-white">{title}</h3>
    <div className="border border-neutral-50/10"></div>
    <div
      className={`flex ${
        title === "Keamanan Pembayaran" ? "flex-row gap-4" : "flex-col gap-2"
      }`}
    >
      {title === "Keamanan Pembayaran"
        ? items.map((item, index) => (
            <img
              key={index}
              src={`/img/${item}.png`}
              alt={item}
              className="h-6"
            />
          ))
        : items.map((item, index) => (
            <a
              key={index}
              href="#"
              className="font-medium text-sm text-white/90 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
    </div>
  </div>
);

const SocialIcon = ({ href, name }) => (
  <a
    href={href}
    className="bg-primary-700 rounded-full hover:bg-primary-900 transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image src={`/img/footer-${name}.png`} width={32} height={32} alt={name} />
  </a>
);

const ContactInfo = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 text-white">
    <div>
      <Icon className="!w-5 !h-5" />
    </div>
    <div className="text-xs">{text}</div>
  </div>
);

const FooterContainer = () => {
  const menuSectionA = {
    "Tentang muatparts": [
      "Tentang Perusahaan",
      "Tentang muatparts",
      "Syarat dan Ketentuan",
      "Kebijakan Privasi",
      "Blog",
    ],
    "Produk muatmuat": ["Big Fleets", "Transport Market", "Iklan", "Lainnya"],
  };
  const menuSectionB = {
    "Layanan muatparts": [
      "Membership",
      "Daftar Merchant",
      "Produk",
      "Iklan muatparts",
    ],
    "Bantuan dan Dukungan": [
      "Pusat Bantuan Buyer",
      "Pusat Bantuan Merchant",
      "Pengaturan Cookies",
    ],
  };
  const menuSectionC = {
    "Metode Pembayaran": [
      "e-Money",
      "Internet Banking",
      "Virtual Account",
      "Kartu Debit/Kredit",
      "Cicil Tanpa Kartu Kredit",
      "Pembayaran di Gerai",
      "QRIS",
    ],
  };
  const menuSectionD = {
    "Opsi Pengiriman": ["Instan", "Express", "Kargo"],
    "Keamanan Pembayaran": ["visa", "mastercard"],
  };

  return (
    <footer className="bg-primary-700 py-8">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex gap-[100px]">
          {/* Left side menu sections */}
          <div className="flex w-[825px] gap-x-[72px]">
            <div className="flex flex-col gap-[30px]">
              {Object.entries(menuSectionA).map(([title, items]) => (
                <MenuSection key={title} title={title} items={items} />
              ))}
            </div>
            <div className="flex flex-col gap-[30px]">
              {Object.entries(menuSectionB).map(([title, items]) => (
                <MenuSection key={title} title={title} items={items} />
              ))}
            </div>
            <div className="flex flex-col gap-[30px]">
              {Object.entries(menuSectionC).map(([title, items]) => (
                <MenuSection key={title} title={title} items={items} />
              ))}
            </div>
            <div className="flex flex-col gap-[30px]">
              {Object.entries(menuSectionD).map(([title, items]) => (
                <MenuSection key={title} title={title} items={items} />
              ))}
            </div>
          </div>

          {/* Right side sections */}
          <div className="flex w-[275px] flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-sm text-white">
                Unduh muatmuat App
              </h3>
              <Image
                src="/img/GooglePlay.png"
                alt="Get it on Google Play"
                width={123}
                height={38}
              />
            </div>

            <div className="flex flex-col gap-[10px]">
              <Image
                src="/img/muatmuat-jalan-mudah-bersama.png"
                alt="muatmuat logo"
                width={223}
                height={68}
              />
              <div className="flex gap-4">
                <SocialIcon href="#" name="linkedin" />
                <SocialIcon href="#" name="facebook" />
                <SocialIcon href="#" name="instagram" />
                <SocialIcon href="#" name="tiktok" />
                <SocialIcon href="#" name="youtube" />
              </div>
              <div className="flex flex-col gap-2">
                <ContactInfo icon={Phone} text="+62 823-3245-1012" />
                <ContactInfo icon={Mail} text="cs@muatmuat.com" />
                <ContactInfo
                  icon={MapPin}
                  text="Jl. Kedungdoro No. 101 - 101 A, Surabaya 60261, Indonesia"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 font-semibold text-center text-white">
          <div className="border border-neutral-50/10 mb-5"></div>
          ©2023 PT. AZLogistik Dot Com
        </div>
      </div>
    </footer>
  );
};

export default FooterContainer;
