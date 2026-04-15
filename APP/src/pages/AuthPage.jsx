import { Card, Tabs, Typography } from "antd";
import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const { Title, Paragraph } = Typography;

export default function AuthPage() {
  const [activeKey, setActiveKey] = useState("login");

  const items = [
    {
      key: "login",
      label: "Iniciar sesión",
      children: <LoginForm />,
    },
    {
      key: "register",
      label: "Registrarse",
      children: (
        <RegisterForm onRegisterSuccess={() => setActiveKey("login")} />
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f5f5f5",
        padding: 20,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 16,
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 8 }}>
          Tu tienda
        </Title>

        <Paragraph style={{ textAlign: "center", color: "#666" }}>
          Accede o crea tu cuenta
        </Paragraph>

        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          items={items}
          centered
        />
      </Card>
    </div>
  );
}
