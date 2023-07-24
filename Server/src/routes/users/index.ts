import express from "express";
import { loginUser, getUser, updateUser } from './controller'
import { validatorLoginRequest } from './validators/Login.request'
import { validatorUpdateUser } from "./validators/UpdateUser.request";
import { fileMulterHandler, multerUpload } from "@middlewares/fileMulterHandler";
import { authHandler } from "@middlewares/authHandler";

const router = express.Router();

router.post('/login', validatorLoginRequest, loginUser)

router.get('/getUser', getUser)

// router.post('/updateUser', authHandler, fileMulterHandler(['imageProfile']), validatorUpdateUser, updateUser)

router.post('/updateUser', fileMulterHandler(['imageProfile', 'lala']), validatorUpdateUser, updateUser)
// router.post('/updateUser', multerUpload.fields([{name: 'imageProfile'}, {name: 'lala'}]), updateUser)


export default router  