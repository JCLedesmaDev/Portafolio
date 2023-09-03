import express from "express";
import { addProject, deleteProject, updateProject } from "./controller";
import { authHandler } from "@middlewares/authHandler";
import { fileMulterHandler } from "@middlewares/fileMulterHandler";
import { validatorAddProjectRequest } from "./validators/addProject.validator";
import { validatorDeleteProjectRequest } from "./validators/deleteProject.validator";
import { validatorUpdateProjectRequest } from "./validators/updateProject.validator";

const router = express.Router();

router.use(authHandler)


router.post('/addProject', fileMulterHandler([
    { name: 'images', maxCount: 5 }
]), validatorAddProjectRequest, addProject);

router.put('/updateProject/:idProject', fileMulterHandler([
    { name: 'image', maxCount: 5 }
]), validatorUpdateProjectRequest, updateProject);

router.delete('/deleteProject/:idProject',
    validatorDeleteProjectRequest, deleteProject
);


export default router;
