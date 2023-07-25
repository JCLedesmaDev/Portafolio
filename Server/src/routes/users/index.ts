import express from "express";
import { fileMulterHandler } from "@middlewares/fileMulterHandler";
import { authHandler } from "@middlewares/authHandler";
import { loginUser, getUser, updateUser } from './controller'
import { validatorLoginRequest } from './validators/Login.request'
import { validatorUpdateUser } from "./validators/UpdateUser.request";
import { validatorUpdateUserPhoto } from "./validators/UpdateUserPhoto.request";

const router = express.Router();

router.post('/login', validatorLoginRequest, loginUser)

router.get('/getUser', getUser)

// router.post('/updateUser', authHandler, fileMulterHandler(['imageProfile']), validatorUpdateUser, updateUser)
// Poner authHandler
router.post('/updateUser', validatorUpdateUser, fileMulterHandler([
    { name: 'imageProfile', maxCount: 1 }
]), validatorUpdateUserPhoto, updateUser)

// TODO: Separar controller para foto del usuario y los datos del usuario en si.
export default router  