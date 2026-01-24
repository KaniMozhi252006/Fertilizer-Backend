const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const ctrl = require("../controllers/orderController");

router.post("/", auth, ctrl.createOrder);
router.get("/my", auth, ctrl.myOrders);
router.get("/all", auth, ctrl.allOrders);
router.put("/:orderId/status", auth, admin, ctrl.updateOrderStatus);

module.exports = router;
