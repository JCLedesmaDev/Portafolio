import express from "express";
import { getAllLogerDb } from './controller'
import { authHandler } from "@middlewares/authHandler";

const router = express.Router();

router.use(authHandler)

router.get('/getAllLogerDb', getAllLogerDb);

export default router;
