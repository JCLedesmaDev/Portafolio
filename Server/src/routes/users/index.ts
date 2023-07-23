import express from "express";
import { loginUser, getUser, updateUser } from './controller'
import { validatorLoginRequest } from './validators/Login.request'
import { validatorUpdateUser } from "./validators/UpdateUser.request";
import { fileMulterHandler } from "@middlewares/fileMulterHandler";
import { authHandler } from "@middlewares/authHandler";

const router = express.Router();

router.post('/login', validatorLoginRequest, loginUser)

router.get('/getUser', getUser)

router.post('/updateUser', authHandler, validatorUpdateUser, fileMulterHandler(['imageProfile']), updateUser)


export default router 