import express from "express";
import { createAlbum, getListAlbumes, deleteAlbum, updateAlbum, buyAlbum, getAllPurchasedAlbumes, getAlbum } from './controller'
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from "../../middlewares/mockHandler";
import { authHandler } from "../../middlewares/authHandler";
import { validatorCreateAlbum } from "./validators/createAlbum";
import { validatorUpdateAlbum } from "./validators/updateAlbum";
import { validatorDeleteAlbum } from "./validators/deleteAlbum";
import { validatorBuyAlbum } from "./validators/buyAlbum";

const router = express.Router();

router.use(authHandler)
router.use(mockHandler)

router.post('/createAlbum', checkRolesHandler(), validatorCreateAlbum, createAlbum)

router.get('/getAllAlbumes', checkRolesHandler(['User']), getListAlbumes)

router.get('/getAlbum', checkRolesHandler(['User']), getAlbum)

router.delete('/deleteAlbum/:id', checkRolesHandler(), validatorDeleteAlbum, deleteAlbum)

router.put('/updateAlbum/:id', checkRolesHandler(), validatorUpdateAlbum, updateAlbum)

router.post('/buyAlbum', checkRolesHandler(['User']), validatorBuyAlbum, buyAlbum)

router.get('/getAllPurchasedAlbumes', checkRolesHandler(['User']), getAllPurchasedAlbumes)



export default router