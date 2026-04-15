import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../services/authService";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

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
      <Card style={{ width: "100%", maxWidth: 600, textAlign: "center" }}>
        <Title level={1}>Bienvenido, sesión iniciada</Title>

        {user?.name && (
          <Paragraph style={{ fontSize: 16 }}>
            Usuario: <strong>{user.name}</strong>
          </Paragraph>
        )}

        <Button type="primary" danger onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Card>
    </div>
  );
}
