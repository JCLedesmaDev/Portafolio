import express from "express";
import controller from "./controller";
import { authHandler, fileMulterHandler } from "@middlewares/index.middlewares";
import { validatorAddTechnologyRequest } from "./validators/addTechnology.validator";
import { validatorDeleteTechnologyRequest } from "./validators/deleteTechnology.validator";
import { validatorUpdateTechnologyRequest } from "./validators/updateTechnology.validator";

const router = express.Router();

router.use(authHandler)


router.post('/addTechnology', fileMulterHandler([
    { name: 'image', maxCount: 1 }
]), validatorAddTechnologyRequest, controller.addTechnology);

router.put('/updateTechnology/:idTechnology', fileMulterHandler([
    { name: 'image', maxCount: 1 }
]), validatorUpdateTechnologyRequest, controller.updateTechnology);

router.delete('/deleteTechnology/:idTechnology',
    validatorDeleteTechnologyRequest, controller.deleteTechnology
);


export default router;
