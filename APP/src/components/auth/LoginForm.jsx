import { Button, Form, Input, message } from "antd";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await loginUser({
        email: values.email,
        password: values.password,
      });
      message.success("Inicio de sesión exitoso");
      navigate("/home");
    } catch (error) {
      message.error(error.response.data.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Correo electrónico"
        name="email"
        rules={[
          { required: true, message: "Ingresa tu correo" },
          { type: "email", message: "Correo inválido" },
        ]}
      >
        <Input placeholder="correo@ejemplo.com" />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: "Ingresa tu contraseña" }]}
      >
        <Input.Password placeholder="********" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit" block>
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
}
