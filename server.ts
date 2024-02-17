import express from "express";
import { router as weaponsRouter } from "./controllers/weapons";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use("/weapons", weaponsRouter);

const PORT = process.env.PORT!;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
