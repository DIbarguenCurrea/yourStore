import React, { useEffect, useState } from "react";
import { Button, Badge, Modal, message} from "antd";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../profile/ProfileModal";
import { getProfile } from "../../services/authService";
import {
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { getCartCount } from "../../services/cartService";

export default function navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0); // Estado para la cantidad de productos en el carrito

  // Contador para el carrito en el navbar
  useEffect(() => {
    // Funcion para actualizar la cantidad
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };
    // Actualiza
    updateCartCount();
    // Agrega el evento al window 
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      // Elimina el evento
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);


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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div onClick={() => navigate("/home")}>
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

         <Badge count={cartCount} showZero style={{ marginRight: 14, backgroundColor: "#fff", color: "#000" }}>
        <Button
          type="text"
          style={{
            marginRight: 10,
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
          }}
          onClick={() => navigate("/cart")}
        >
          <ShoppingCartOutlined />
          Cart
        </Button>
        </Badge>

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
