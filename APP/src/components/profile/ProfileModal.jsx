import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";
import ChangeNameModal from "./ChangeNameModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { EditOutlined } from "@ant-design/icons";

export default function ProfileModal({ open, onClose }) {
  //Esto ayuda a que en el form ya los campos esten llenos con los datos del usuario.
  const [form] = Form.useForm();
  const [changeNameModalOpen, setChangeNameModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfile();
        //Setemos los valores en los input
        form.setFieldsValue({
          name: response.user.name,
          email: response.user.email,
        });
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };

    fetchUser();
  }, [open, form]);

  return (
    <Modal title="Profile" open={open} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Input value={form.getFieldValue("name")} disabled />
            <Button type="primary" onClick={() => setChangeNameModalOpen(true)}>
              <EditOutlined />
              Change name
            </Button>
          </div>
        </Form.Item>

        <ChangeNameModal
          open={changeNameModalOpen}
          onClose={() => setChangeNameModalOpen(false)}
        />

        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            type="primary"
            onClick={() => setChangePasswordModalOpen(true)}
          >
            <EditOutlined />
            Change password
          </Button>
        </div>

        <ChangePasswordModal
          open={changePasswordModalOpen}
          onClose={() => setChangePasswordModalOpen(false)}
        />
      </Form>
    </Modal>
  );
}
