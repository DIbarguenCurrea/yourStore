const getProducts = async (req, res) => {
  try {
    const response = await fetch(process.env.API_FAKESTORE_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

module.exports = { getProducts };
