const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { dashboard } = require("../controllers/adminController");

router.get("/dashboard", auth, admin, dashboard);
module.exports = router;
