import express from "express";
import { authHandler } from "@middlewares/authHandler";
import { loginUser, getUser, updateUser } from './controller'
import { validatorLoginRequest } from './validators/Login.request'
import { validatorUpdateUser } from "./validators/UpdateUser.request";

const router = express.Router();

router.post('/login', validatorLoginRequest, loginUser)

router.get('/getUser', getUser)

router.post('/updateUser', authHandler, validatorUpdateUser, updateUser)

export default router  