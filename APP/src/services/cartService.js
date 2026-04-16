// Constante para el key del localStorage
const CART_KEY = "cart";

// Obtener el carrito del localStorage
export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Guardar el carrito en el localStorage
export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

// Agregar un producto al carrito
export const addToCart = (product) => {
  // Carrito del localStorage
  const cart = getCart();

  // Verificar si el producto ya existe en el carrito
  const existingProduct = cart.find((item) => item.product_id === product.product_id);

  // Si el producto ya existe, actualizar la cantidad
  if (existingProduct) {
    const updatedCart = cart.map((item) =>
      item.product_id === product.product_id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    // Guardar el carrito actualizado en el localStorage
    saveCart(updatedCart);
  } else {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    saveCart(updatedCart);
  }
};

// Obtener la cantidad de productos en el carrito
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};

// Eliminar un producto del carrito
export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.product_id !== productId);
  saveCart(updatedCart);
};

// Limpiar el carrito
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};