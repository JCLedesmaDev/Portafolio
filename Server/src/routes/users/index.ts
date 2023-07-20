import express from "express";
import { loginUser } from './controller'
import { validatorLoginRequest } from './validators/Login.request'

const router = express.Router();

router.post('/login', validatorLoginRequest, loginUser)

export default router 