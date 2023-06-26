const userController = require("../controllers/userController.js");

const router = require("express").Router();

router.get("/getAllUsers", userController.getAllUsers);
router.post("/createUser", userController.createUser);
router.post("/Login", userController.logIn);

router.get("/getUser/:id", userController.getUser);

module.exports = router;
