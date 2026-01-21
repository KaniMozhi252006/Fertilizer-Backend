const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const ctrl = require("../controllers/productController");

router.get("/", ctrl.getProducts);

router.post("/", auth, admin, ctrl.addProduct);

router.put("/:id", auth, admin, ctrl.updateProduct);
router.delete("/:id", auth, admin, ctrl.deleteProduct);

module.exports = router;
