const Express = require("express");
const checkAuth = require("./middlewares/check_auth");
const controllers = require("./controllers");

const router = Express.Router();

router.post("/signin", controllers.sign_in);
router.post("/signup", controllers.sign_up);
router.get("/info", checkAuth, controllers.info);
router.get("/latency", checkAuth, controllers.latency);
router.get("/logout", checkAuth, controllers.logout);

module.exports = router;
