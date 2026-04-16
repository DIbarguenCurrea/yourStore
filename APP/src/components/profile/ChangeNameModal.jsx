import { Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { getProfile, updateUser } from "../../services/authService";

export default function ChangeNameModal({ open, onClose }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (!open) return;
    const fetchUser = async () => {
      try {
        await getProfile();
        setName("");
      } catch (error) {
        console.error("Error al obtener el nombre", error);
      }
    };
    fetchUser();
  }, [open]);

  const handleOk = async () => {
    try {
      await updateUser({ name });
      onClose();
      message.success("Su nombre ha sido actualizado");
    } catch (error) {
      console.error("Error al actualizar el nombre", error);
    }
  };
  return (
    <Modal title="Change Name" open={open} onCancel={onClose} onOk={handleOk}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your new name"
      />
    </Modal>
  );
}
