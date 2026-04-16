import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../profile/ProfileModal";
import { getProfile } from "../../services/authService";
import {
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  //Logica de cerrar sesión, delete del token en localstorage y lo redirijo al login/register.
  const handleLogout = () => {
    //ant design tiene un modal confirm para acciones de confirmacion.
    Modal.confirm({
      title: "Logout?",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to logout?",
      okText: "Yes, logout",
      cancelText: "Cancel",
      okType: "danger",
      onOk: () => {
        try {
          localStorage.removeItem("token");
          message.success("Sesión cerrada correctamente");
          navigate("/");
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
          message.error("No se pudo cerrar la sesión");
        }
      },
    });
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfile();
        setUser(response.user);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ color: "#fff" }}>Your Store</h1>
      </div>
      <div>
        <Button
          type="text"
          style={{
            marginRight: 10,
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
          }}
          onClick={() => setOpen(true)}
        >
          <UserOutlined />
          {user?.name || "Profile"}
        </Button>
        {/* Modal de perfil */}
        <ProfileModal open={open} onClose={() => setOpen(false)} />

        <Button
          type="text"
          style={{
            marginRight: 10,
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          <ShoppingCartOutlined />
          Cart
        </Button>
        <Button
          type="text"
          style={{
            marginRight: 10,
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
          }}
          onClick={handleLogout}
        >
          <LogoutOutlined />
          Logout
        </Button>
      </div>
    </div>
  );
}
