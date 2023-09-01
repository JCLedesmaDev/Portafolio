import express from "express";
import { authHandler } from "@middlewares/authHandler";
import { addProject } from "./controller";
import { fileMulterHandler } from "@middlewares/fileMulterHandler";
import { validatorAddProjectRequest } from "./validators/addProject.validator";

const router = express.Router();

router.use(authHandler)

// router.get('/getSkills', getSkills);

router.post('/addProject', fileMulterHandler([
    { name: 'images', maxCount: 5 }
]), validatorAddProjectRequest, addProject);

// router.put('/updateTechnology/:idTechnology', fileMulterHandler([
//     { name: 'image', maxCount: 1 }
// ]), validatorUpdateTechnologyRequest, updateTechnology);

// router.delete('/deleteTechnology/:idTechnology',
//     validatorDeleteTechnologyRequest, deleteTechnology
// );


export default router;
