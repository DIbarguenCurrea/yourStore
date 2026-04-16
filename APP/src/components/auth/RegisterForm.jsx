import { Button, Form, Input, message } from "antd";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ onRegisterSuccess }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  //Aqui creo la logica de la creacion del usuario
  const onFinish = async (values) => {
    //Aqui llamo al servicio de authService
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      //Aqui mensaje de exito

      message.success("Usuario registrado correctamente");
      form.resetFields();

      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
      //Sí es exitoso el registro, lo envio al Home
      navigate("/home");
    } catch (error) {
      message.error(
        error.response.data.message || "No se pudo registrar el usuario",
      );
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Nombre"
        name="name"
        rules={[{ required: true, message: "Ingresa tu nombre" }]}
      >
        <Input placeholder="Juan Perez" />
      </Form.Item>

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
        rules={[
          { required: true, message: "Ingresa una contraseña" },
          { min: 6, message: "Mínimo 6 caracteres" },
        ]}
      >
        <Input.Password placeholder="********" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit" block>
          Registrarse
        </Button>
      </Form.Item>
    </Form>
  );
}
