import express from "express";
import { loginUser, getUser, updateUser } from './controller'
import { validatorLoginRequest } from './validators/Login.request'
import { validatorUpdateUser } from "./validators/UpdateUser.request";

const router = express.Router();

router.post('/login', validatorLoginRequest, loginUser)

router.get('/getUser', getUser)

router.put('/updateUser', validatorUpdateUser, updateUser)

export default router 