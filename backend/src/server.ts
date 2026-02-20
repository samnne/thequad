import { loadEnvFile } from "node:process";

if (process.env.NODE_ENV !== "production") {
  loadEnvFile();
}
import express from "express";
import { logRequests } from "./middleware/middleware.ts";
import authRoutes from "./routes/auth.ts";
import userRoutes from "./routes/users.ts";
import listingRoutes from "./routes/listings.ts";
import { ErrorMessage } from "./utils/utils.ts";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => logRequests(req, res, next));

app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use("/listings", listingRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to theQuad API",
  });
});

app.use((req, res) => {
  
  res.status(404).json(ErrorMessage("Route not Found", 404));
});

app.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}`);
});
