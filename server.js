import "dotenv/config";
import express from "express";
import { totalPrice } from "./controllers/price.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use("*", (req, res, next) => {
  console.log("Request", req.method, req.originalUrl);

  next();
});

app.get("/api/totalPrice", totalPrice);

app.get("*", (req, res) => {
  res.send({ type: "Bad Request" });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
