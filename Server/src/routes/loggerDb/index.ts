import express from "express";
import controller from './controller'
import { authHandler } from "@middlewares/authHandler";

const router = express.Router();

router.use(authHandler)

router.get('/getAllLogerDb', controller.getAllLogerDb);

export default router;
