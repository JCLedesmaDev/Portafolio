import express from "express";
import controller from './controller'
import { authHandler } from "@middlewares/authHandler";
import { getAllLogerDbRequest } from './validators/getAll.validator';

const router = express.Router();

router.use(authHandler)

router.post('/getAll', getAllLogerDbRequest, controller.getAllLogerDb);

export default router;
