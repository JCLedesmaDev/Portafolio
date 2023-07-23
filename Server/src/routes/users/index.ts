import express from "express";
import { loginUser, getUser, updateUser } from './controller'
import { validatorLoginRequest } from './validators/Login.request'
import { validatorUpdateUser } from "./validators/UpdateUser.request";

const router = express.Router();

router.post('/login', validatorLoginRequest, loginUser)

router.get('/getUser', getUser)

router.put('/updateUser', validatorUpdateUser, updateUser)


// https://www.google.com/search?client=opera&hs=dbn&tbm=vid&sxsrf=AB5stBg0VsLvdCuheYh0crM7tV-ws5Q5Tg:1690078737232&q=manejo+de+pdf+en+nodejs&sa=X&ved=2ahUKEwinrZn24aOAAxXIrJUCHd_qBAsQ8ccDegQIFhAH&biw=1662&bih=795&dpr=1.13#fpstate=ive&vld=cid:c0823f5f,vid:diJE8esd_V4

export default router 