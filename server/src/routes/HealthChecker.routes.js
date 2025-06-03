import express from "express"
import { HealthChecker } from "../controllers/HealthChecker.js"


const router=express.Router();


router.route("/").get(HealthChecker)

router.route("/kartik").get((req, res) => {
  res.send("hello there from kartik")
}
)


export default  router