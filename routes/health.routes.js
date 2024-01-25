import { Router } from "express";
import { health } from "../controller/Health/health.js";

const router = Router()

router.route('/').get(health)

export default router