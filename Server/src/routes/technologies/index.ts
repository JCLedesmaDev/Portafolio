import express from "express";
import { authHandler } from "@middlewares/authHandler";
import {
    createTechnology, deleteTechnology,
    getTechnologies, updateTechnology
} from "./controller";
import { validatorCreateTechnology } from "./validators/CreateTechnology.request";
import { validatorDeleteTechnology } from "./validators/DeleteTechnology.request";
import { validatorUpdateTechnology } from "./validators/UpdateTechnology.request";

const router = express.Router();

router.use(authHandler)

router.get('/getTechnologies', getTechnologies);
router.post('/createTechnology', validatorCreateTechnology, createTechnology);
router.put('/updateTechnology/:id', validatorUpdateTechnology, updateTechnology);
router.delete('/deleteTechnology/:id', validatorDeleteTechnology, deleteTechnology);


export default router;
