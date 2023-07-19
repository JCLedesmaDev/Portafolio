import express from "express";
import { loginUser } from './controller'
import { validatorLogin } from './validators/login'

const router = express.Router();

router.post('/login', validatorLogin, loginUser)

export default router 