import { Router } from "express";
import { createProduct, getAll, getById } from "../controllers/ProductsController";

const router: Router = Router();

router.get("/sabroso_dev_test/api/v1/products", getAll);
router.get("/sabroso_dev_test/api/v1/products/:productId", getById);
router.post("/sabroso_dev_test/api/v1/products/:productId", createProduct);

export default router;
