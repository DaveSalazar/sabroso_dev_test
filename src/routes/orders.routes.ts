import { Router } from "express";
import { createOrder, getByUser } from "../controllers/OrdersController";

const router: Router = Router();

router.get("/sabroso_dev_test/api/v1/orders/users/:userId", getByUser);
router.post("/sabroso_dev_test/api/v1/orders/:orderId", createOrder);

export default router;
