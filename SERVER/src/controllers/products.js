const axios = require("axios");

const getProducts = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_FAKESTORE_URL}/api/products`,
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

module.exports = { getProducts };
