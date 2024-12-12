import { useState } from 'react';
import Modal from '@/components/Modals/modal';
import Input from '@/components/Input/Input';
import IconComponent from '@/components/IconComponent/IconComponent';
import style from "./UpdateEmailModal.module.scss"

const verifiedEmails = ['verified@example.com', 'test@example.com']; // Dummy data

const UpdateEmailModal = ({ 
  isOpen, 
  setIsOpen, 
  currentEmail, 
  onEmailChange 
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    // Reset error
    setError('');

    // Validate empty email
    if (!email.trim()) {
      setError('Email belum diisi.');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError('Penulisan email salah');
      return;
    }

    // Validate if same as current email
    if (email === currentEmail) {
      setError('Email tidak boleh sama dengan sebelumya');
      return;
    }

    // Validate if email already verified
    if (verifiedEmails.includes(email)) {
      setError('Email sudah terdaftar');
      return;
    }

    // If all validations pass
    onEmailChange(email);
    setEmail('');
    setIsOpen(false);
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsOpen(false);
  };

  return (
    <Modal
      isBig
      isOpen={isOpen}
      setIsOpen={handleClose}
      title=""
      action1={{
        text: 'Simpan',
        style: 'full',
        color: '#176CF7',
        action: handleSave,
        customStyle: { marginTop: '24px' }
      }}
    >
      <div className="flex flex-col gap-y-6">
        <span className="font-bold text-[14px] leading-[16.8px] text-center">Ubah Email</span>
        {error ? (
          <div className="rounded-md bg-[#FFE5E5] border-[#F71717] border py-[15px] flex flex-row items-center gap-x-2.5 justify-center">
            <IconComponent
              classname={style.icon_error}
              src="/icons/info.svg"
            />
            <span className="font-semibold text-[12px] leading-[14.4px]">{error}</span>
          </div>
        ) : null}
        <Input
          type="email"
          placeholder="Masukkan email"
          value={email}
          changeEvent={(e) => setEmail(e.target.value)}
          classname={error ? style.input_error : ""}
          icon={{
            left: '/icons/check-yellow.svg'
          }}
        />
      </div>
    </Modal>
  );
};

export default UpdateEmailModal;