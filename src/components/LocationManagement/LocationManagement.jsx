"use client";

import Button from "../Button/Button";
import Modal from "../Modals/modal";
import AddressForm from "./AddressForm";

import { useState } from "react";

const LocationManagement = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <AddressForm />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeArea={false}
        closeBtn={true}
      >
        <div>Apakah kamu yakin ingin mengganti lokasi?</div>

        <div className="flex items-center justify-center">
          <Button name="tidak" color="primary_secondary">
            Tidak
          </Button>
          <Button name="ya">Ya</Button>
        </div>
      </Modal>
    </div>
  );
};

export default LocationManagement;
