import express from "express";
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from "../../middlewares/mockHandler";
import { authHandler } from "../../middlewares/authHandler";
import { createCollection, deleteCollection, getAllCollections, updateCollection } from "./controller";
import { validatorCreateCollection } from "./validators/createCollectiom";
import { validatorDeleteCollection } from "./validators/deleteCollection";
import { validatorUpdateCollection } from "./validators/updateCollection";

const router = express.Router();

router.use(authHandler)
router.use(mockHandler)


router.post('/createCollection', checkRolesHandler(), validatorCreateCollection, createCollection)

router.get('/getAllCollections', checkRolesHandler(['User']), getAllCollections)

router.delete('/deleteCollection/:id', checkRolesHandler(), validatorDeleteCollection, deleteCollection)

router.put('/updateCollection/:id', checkRolesHandler(), validatorUpdateCollection, updateCollection)


export default router