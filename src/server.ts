import dotenv from "dotenv";
dotenv.config(); // ← must be first, before any other imports read process.env

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
