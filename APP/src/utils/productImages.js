// como las imagenes de la API no funcionan, vamos a crear utils que lo que hara es sobreescribir la imagen con una imagen de nuestra colección.

//Los imports de las imagenes
import smartphone from "../assets/products/smartphone.png";
import laptop from "../assets/products/laptop.webp";
import wirelessHeadphones from "../assets/products/wireless-headphones.webp";
import smartwatch from "../assets/products/smartwatch.png";
import professionalDslrCamera from "../assets/products/professional-dslr-camera.webp";
import smartTv from "../assets/products/smart-tv.png";
import tablet from "../assets/products/tablet.png";
import gamingConsole from "../assets/products/gaming-console.png";
import energyEfficientRefrigerator from "../assets/products/energy-efficient-refrigerator.png";

const customProductImages = {
  1: smartphone,
  2: laptop,
  3: wirelessHeadphones,
  4: smartwatch,
  5: professionalDslrCamera,
  6: smartTv,
  7: tablet,
  8: gamingConsole,
  9: energyEfficientRefrigerator,
};

// devuelve la imagen del producto y la pasamos por el id del producto
export const getProductImage = (product) => {
  return customProductImages[product.product_id] || product.image;
};
