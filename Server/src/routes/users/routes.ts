import express from "express";
import controller from './controller'
import { validatorLoginRequest } from './validators/login.validator'
import { validatorUpdateUserRequest } from "./validators/updateUser.validator";
import { authHandler, fileMulterHandler } from "@middlewares/index.middlewares";

const router = express.Router();

router.post('/login', validatorLoginRequest, controller.loginUser);

router.get('/logOut', authHandler, controller.logOutUser);

router.get('/getUser', controller.getUser);

router.get('/getAllUsers', authHandler, controller.getAllUser);

router.post('/updateUser', authHandler, fileMulterHandler([
    { name: 'imageProfile', maxCount: 1 },
    { name: 'curriculumVitae', maxCount: 1 }
]), validatorUpdateUserRequest, controller.updateUser);

export default router;