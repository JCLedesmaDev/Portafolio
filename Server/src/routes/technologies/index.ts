import express from "express";
import { authHandler } from "@middlewares/authHandler";
import {
    createTechnology, deleteTechnology,
    getTechnologies, updateTechnology
} from "./controller";
import { validatorCreateTechnologyRequest } from "./validators/createTechnology.validator";
import { validatorDeleteTechnologyRequest } from "./validators/deleteTechnology.validator";
import { validatorUpdateTechnologyRequest } from "./validators/updateTechnology.validator";
import { fileMulterHandler } from "@middlewares/fileMulterHandler";

const router = express.Router();

router.use(authHandler)

router.get('/getTechnologies', getTechnologies);

router.post('/createTechnology', fileMulterHandler([
    { name: 'image', maxCount: 1 }
]), validatorCreateTechnologyRequest, createTechnology);

router.put('/updateTechnology/:idTechnology', fileMulterHandler([
    { name: 'image', maxCount: 1 }
]), validatorUpdateTechnologyRequest, updateTechnology);

router.delete('/deleteTechnology/:idTechnology',
    validatorDeleteTechnologyRequest, deleteTechnology
);


export default router;
