import express from "express";
import { addProject } from "./controller";
import { authHandler } from "@middlewares/authHandler";
import { fileMulterHandler } from "@middlewares/fileMulterHandler";
import { validatorAddProjectRequest } from "./validators/addProject.validator";

const router = express.Router();

router.use(authHandler)

// router.get('/getSkills', getSkills);

router.post('/addProject', fileMulterHandler([
    { name: 'images', maxCount: 5 }
]), validatorAddProjectRequest, addProject);

// router.put('/updateTechnology/:idProject', fileMulterHandler([
//     { name: 'image', maxCount: 5 }
// ]), validatorUpdateProjectRequest, updateProject);

// router.delete('/deleteTechnology/:idTechnology',
//     validatorDeleteTechnologyRequest, deleteTechnology
// );


export default router;
