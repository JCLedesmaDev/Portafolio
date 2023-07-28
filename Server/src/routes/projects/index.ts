import { authHandler } from "@middlewares/authHandler";
import express from "express";

const router = express.Router();

router.use(authHandler)


export default router;