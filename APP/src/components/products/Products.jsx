import { Button, Card, Image, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { getProductImage } from "../../utils/productImages";

const { Title, Paragraph } = Typography;

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        // console.log(response);
        setProducts(response);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Card title={product.name} key={product.id}>
          <Image
            src={getProductImage(product)}
            alt={product.name}
            style={{ width: "100%", height: 200, objectFit: "contain" }}
          />
          <Title level={3}>{product.name}</Title>
          <Paragraph>${product.price}</Paragraph>
          <Paragraph>{product.description}</Paragraph>
          <Button type="primary">Add to Cart</Button>
        </Card>
      ))}
    </Row>
  );
}
