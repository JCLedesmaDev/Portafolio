import express from "express";
import { authHandler } from "@middlewares/authHandler";
import controller from './controller'
import { validatorLoginRequest } from './validators/login.validator'
import { validatorUpdateUserRequest } from "./validators/updateUser.validator";
import { fileMulterHandler } from "@middlewares/fileMulterHandler";

const router = express.Router();

router.post('/login', validatorLoginRequest, controller.loginUser);

router.get('/logOut', authHandler, controller.logOutUser);

router.get('/getUser', controller.getUser);

router.post('/updateUser', authHandler, fileMulterHandler([
    { name: 'imageProfile', maxCount: 1 }
]), validatorUpdateUserRequest, controller.updateUser);

export default router;