import express, { urlencoded } from "express";
import morgan from "morgan";

import ordersRoutes from './routes/orders.routes';
import productsRoutes from './routes/products.routes';
import "./database";

const app = express();
const config: string = process.env.CONFIG || "dev";


app.set("port", process.env.PORT || 4000);

// MIDDLEWARES
app.use(express.json());
app.use(morgan(config));
app.use(urlencoded({ extended: false }));

// ROUTES
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(ordersRoutes);
app.use(productsRoutes);


// endpoint for any route not included in the app
app.use("*", async (req, res) => {
  res.status(404).json("Route does not exists");
});

export default app;
