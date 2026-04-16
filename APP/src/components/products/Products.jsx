import { Button, Card, Image, Row, Col, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { getProductImage } from "../../utils/productImages";
import { addToCart } from "../../services/cartService";

const { Title, Paragraph } = Typography;

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    message.success(`${product.name} agregado al carrito`);
  };

  return (
    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
      {products.map((product) => (
        <Col xs={24} sm={12} md={8} key={product.product_id}>
          <Card
            hoverable
            style={{ height: "100%" }}
            cover={
              <Image
                src={getProductImage(product)}
                alt={product.name}
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "contain",
                  padding: 16,
                }}
              />
            }
          >
            <Title level={4}>{product.name}</Title>
            <Paragraph>${product.price}</Paragraph>
            <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>

            <Button type="primary" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
