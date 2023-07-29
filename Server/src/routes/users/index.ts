import express from "express";
import { authHandler } from "@middlewares/authHandler";
import { loginUser, getUser, updateUser } from './controller'
import { validatorLoginRequest } from './validators/login.validator'
import { validatorUpdateUser } from "./validators/updateUser.validator";
import { fileMulterHandler } from "@middlewares/fileMulterHandler";

const router = express.Router();

router.post('/login', validatorLoginRequest, loginUser);

router.get('/getUser', getUser);

router.post('/updateUser', authHandler, fileMulterHandler([
    {name:'imageProfile', maxCount: 1}
]), validatorUpdateUser, updateUser);

export default router;