import express from "express";
import { loginUser, registerUser } from './controller'
import { validatorLogin } from './validators/login'
import { validatorRegister } from './validators/register'
import { mockHandler } from "../../middlewares/mockHandler";

const router = express.Router();

router.use(mockHandler)


router.post('/login', validatorLogin, loginUser)

router.post('/register', validatorRegister, registerUser)

export default router 