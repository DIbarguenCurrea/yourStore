require("dotenv").config();
const dbConfig = require("./src/config/dbConfig.js");
const app = require("./src/server.js");
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const connection = await dbConfig.getConnection();
    console.log("✅ Conexión a MySQL exitosa'");
    connection.release();

    await app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error conectando a MySQL:", error.message);
  }
};

startServer();
