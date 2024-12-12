import registerForm from "@/store/registerForm";
import { PencilLine } from "lucide-react";
import { DivParticleRegister } from "./InformasiTokoAkun";

const KonfirmasiData = () => {
  const { formData } = registerForm();

  const sections = [
    {
      title: "Informasi Toko",
      fields: [
        {
          title: "Tipe Toko",
          value: formData[0].tipeToko === 0 ? "Individu" : "Badan Usaha",
        },
        ...(formData[0].tipeToko === 1
          ? [
              { title: "Nama Perusahaan", value: formData[0].companyName },
              { title: "Badan Usaha", value: formData[0].businessEntityID },
            ]
          : []),
        { title: "Nama Toko", value: formData[0].storeName },
        {
          title: "Logo Toko",
          value: formData[0].logo,
          type: "image",
        },
        { title: "Alamat", value: formData[0].address },
        { title: "Lokasi", value: formData[0].location },
        { title: "Kecamatan", value: formData[0].districtID },
        { title: "Kota", value: formData[0].cityID },
        { title: "Provinsi", value: formData[0].provinceID },
        { title: "Kode Pos", value: formData[0].postalCode },
        {
          title: "Titik Lokasi",
          value: "Lihat Pin Lokasi",
          type: "map",
        },
        { title: "Email", value: formData[0].email },
      ],
    },
    {
      title: "Data Pendaftar",
      fields: [
        {
          title: "KTP Pendaftar",
          value: formData[1].ktpFile,
          type: "file",
          desc: "File.png",
        },
        { title: "No. KTP Pendaftar", value: formData[1].ktpNo },
        { title: "Nama KTP Pendaftar", value: formData[1].ktpNama },
      ],
    },
    {
      title: "Informasi Rekening",
      fields: [
        { title: "Nama Bank", value: "Bank Central Asia (BCA)" },
        { title: "Nama Pemilik Rekening", value: formData[1].accountName },
        { title: "No. Rekening", value: formData[1].accountNumber },
      ],
    },
  ];

const renderFieldValue = (field) => {
  const { title, value, desc } = field;

  switch (title) {
    case "Logo Toko":
      return (
        <img
          src={value || "/img/chopper.png"}
          className="size-[72px] rounded-full border border-[#868686]"
          alt="Logo Toko"
        />
      );
    case "Titik Lokasi":
      return (
        <button
          className="w-full h-[120px] bg-[#F3F4F6] rounded-lg flex items-center justify-center"
          onClick={() => console.log("Show map")}
        >
          Lihat Pin Lokasi
        </button>
      );
    case "Tipe Toko":
      return (
        <span className="font-medium text-xs text-neutral-900">
          {value === 0 ? "Individu" : "Badan Usaha"}
        </span>
      );
    case "KTP Pendaftar":
      return (
        <div className="flex items-center gap-2">
          <span className="text-primary-700">{value}</span>
          <span className="text-neutral-600">{desc}</span>
        </div>
      );
    default:
      return (
        <span className="font-medium text-xs text-neutral-900">
          {value || "-"}
        </span>
      );
  }
};

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] p-6"
        >
          <div className="flex justify-between items-center">
            <span className="text-neutral-900 font-semibold text-lg block">
              {section.title}
            </span>
            <div className="flex items-center gap-2 cursor-pointer">
              <PencilLine size={16} className="text-primary-700" />
              <span className="text-xs font-medium text-primary-700">Ubah</span>
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-5">
            {section.fields.map((field, fieldIdx) => (
              <DivParticleRegister
                key={fieldIdx}
                title={field.title}
                mustFill={false}
                classLabel="!w-[350px]"
                classname={
                  field.title === "Logo Toko" ? "!items-center" : "!items-start"
                }
              >
                {renderFieldValue(field)}
              </DivParticleRegister>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KonfirmasiData;
