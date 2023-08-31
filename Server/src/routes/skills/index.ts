import express from "express";
import { authHandler } from "@middlewares/authHandler";
import { getSkills,
    addTechnology,updateTechnology, deleteTechnology
} from "./controller";
import { validatorAddTechnologyRequest } from "./validators/addTechnology.validator";
import { validatorDeleteTechnologyRequest } from "./validators/deleteTechnology.validator";
import { validatorUpdateTechnologyRequest } from "./validators/updateTechnology.validator";
import { fileMulterHandler } from "@middlewares/fileMulterHandler";

const router = express.Router();

router.use(authHandler)

router.get('/getSkills', getSkills);

router.post('/addTechnology', fileMulterHandler([
    { name: 'image', maxCount: 1 }
]), validatorAddTechnologyRequest, addTechnology);

router.put('/updateTechnology/:idTechnology', fileMulterHandler([
    { name: 'image', maxCount: 1 }
]), validatorUpdateTechnologyRequest, updateTechnology);

router.delete('/deleteTechnology/:idTechnology',
    validatorDeleteTechnologyRequest, deleteTechnology
);


export default router;
