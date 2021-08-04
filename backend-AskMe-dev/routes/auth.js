const { Router } = require("express");
const { logErrorLocation, verifyToken } = require("../scripts/utils");
const { signUp, login } = require("../services/authService");
const router = new Router();

router.post("/signup", async (req, res) => {
  try {
    await signUp(req)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    logErrorLocation(__filename, "/signup", error);
    throw new Error(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    await login(req, res)
      .then((data) => {
        const responseData = {
          token: data.token,
          userData: data.responseUserData[0],
        };
        res
          .status(200)
          .header("authorization", "Bearer " + data.token.toString())
          .json(responseData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    logErrorLocation(__filename, "/login", error);
    throw new Error(error);
  }
});


module.exports = router;
