//packages import
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
// default middlewares configurations
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "28kb" }));
app.use(express.urlencoded({ extended: true, limit: "28kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import subCategoryRouter from "./routes/sub_category.routes.js";
import addressRouter from "./routes/address.routes.js";
import orderRouter from "./routes/orders.routes.js";
import orderItemRouter from "./routes/order_items.routes.js";
import inventoryRouter from "./routes/inventory.routes.js";
import reviewRouter from "./routes/reviews.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subcategory", subCategoryRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/order/items", orderItemRouter);
app.use("/api/v1/inventory", inventoryRouter);
app.use("/api/v1/review", reviewRouter);

export { app };
