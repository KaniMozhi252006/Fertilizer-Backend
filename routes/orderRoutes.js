const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/orderController");

router.post("/", auth, ctrl.createOrder);
router.get("/my", auth, ctrl.myOrders);
router.get("/all", auth, ctrl.allOrders);

module.exports = router;
