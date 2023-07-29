import express from "express";
import { authHandler } from "@middlewares/authHandler";
import {
    createTechnology, deleteTechnology,
    getTechnologies, updateTechnology
} from "./controller";
import { validatorCreateTechnology } from "./validators/createTechnology.validator";
import { validatorDeleteTechnology } from "./validators/deleteTechnology.validator";
import { validatorUpdateTechnology } from "./validators/updateTechnology.validator";

const router = express.Router();

router.use(authHandler)

router.get('/getTechnologies', getTechnologies);
router.post('/createTechnology', validatorCreateTechnology, createTechnology);
router.put('/updateTechnology/:idTechnology', validatorUpdateTechnology, updateTechnology);
router.delete('/deleteTechnology/:idTechnology', validatorDeleteTechnology, deleteTechnology);


export default router;
