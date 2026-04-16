import React, { useEffect, useState } from "react";
import { Card, List as AntList, Typography, Empty, Button, Image } from "antd";
import {
  getCart,
  removeFromCart,
  clearCart,
} from "../../services/cartService";
import { getProductImage } from "../../utils/productImages";

const { Title, Text } = Typography;

export default function List() {
  const [cartItems, setCartItems] = useState([]);

  // Funcion para cargar los productos del carrito
  const loadCart = () => {
    // Setea el carrito en el estado
    setCartItems(getCart());
  };

  // Efecto para cargar los productos del carrito
  useEffect(() => {
    // Carga los productos del carrito
    loadCart();
    // Agrega el evento al window para actualizar la cantidad cuando se actualiza el carrito
    window.addEventListener("cartUpdated", loadCart);
    // Elimina el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  // Funcion para eliminar un producto del carrito
  const handleRemove = (id) => {
    // Elimina el producto del carrito
    removeFromCart(id);
  };
  
  // Funcion para vaciar el carrito
  const handleClearCart = () => {
    clearCart();
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Card title="Your Products" style={{ marginTop: 16 }}>
      {cartItems.length === 0 ? (
        <Empty description="No hay productos en el carrito" />
      ) : (
        <>
          <AntList
            dataSource={cartItems}
            renderItem={(item) => (
              <AntList.Item
                actions={[
                  <Button danger onClick={() => handleRemove(item.product_id)}>
                    Eliminar
                  </Button>,
                ]}
              >
                <div style={{ width: "100%", display: "flex", flexDirection: "row", }}>
                  <Image src={getProductImage(item)} alt={item.name} style={{ width: 100, height: 100, objectFit: "contain" }} />
                  <div style={{ display: "flex", flexDirection: "column", }}>
                  <Title level={5} style={{ marginBottom: 0 }}>
                    {item.name}
                  </Title>
                  <Text>Cantidad: {item.quantity}</Text>
                    <br />
                    <Text>Precio: ${item.price}</Text>
                    <br />
                    <Text strong>Subtotal: ${item.price * item.quantity}</Text>
                  </div>
                </div>
              </AntList.Item>
            )}
          />

          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
            <Button danger onClick={handleClearCart}>
              Vaciar carrito
            </Button>
            <Text strong>Total: ${total}</Text>
          </div>
        </>
      )}
    </Card>
  );
}