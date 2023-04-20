const app = require("./app");
require("dotenv").config();
const db = require("./db/connection");

const PORT = process.env.PORT || 9090;
const startServer = async () => {
  try {
    await db();
    app.listen(PORT, (e) => {
      if (e) {
        console.error("Server launch failed", e);
        return;
      }
      console.log("Database connected successfully");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (e) {
    console.error("Database connection error", e);
  }
};

startServer();
