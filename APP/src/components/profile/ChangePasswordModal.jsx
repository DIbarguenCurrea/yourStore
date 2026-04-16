import { Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { getProfile, updateUser } from "../../services/authService";

export default function ChangePasswordModal({ open, onClose }) {
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!open) return;
    const fetchUser = async () => {
      try {
        await getProfile();
        setPassword("");
      } catch (error) {
        console.error("Error al obtener la contraseña", error);
      }
    };
    fetchUser();
  }, [open]);

  const handleOk = async () => {
    try {
      await updateUser({ password });
      onClose();
      message.success("Su Contraseña ha sido actualizada");
    } catch (error) {
      console.error("Error al actualizar la contraseña", error);
    }
  };

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <Input.Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your new password"
      />
    </Modal>
  );
}
