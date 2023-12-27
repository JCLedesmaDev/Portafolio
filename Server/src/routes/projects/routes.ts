import express from "express";
import controller from "./controller";
import { authHandler } from "@middlewares/authHandler";
import { fileMulterHandler } from "@middlewares/fileMulterHandler";
import { validatorAddProjectRequest } from "./validators/addProject.validator";
import { validatorDeleteProjectRequest } from "./validators/deleteProject.validator";
import { validatorUpdateProjectRequest } from "./validators/updateProject.validator";

const router = express.Router();

router.use(authHandler)


router.post('/addProject', fileMulterHandler([
    { name: 'images', maxCount: 5 }
]), validatorAddProjectRequest, controller.addProject);

router.put('/updateProject/:idProject', fileMulterHandler([
    { name: 'image', maxCount: 5 }
]), validatorUpdateProjectRequest, controller.updateProject);

router.delete('/deleteProject/:idProject',
    validatorDeleteProjectRequest, controller.deleteProject
);


export default router;
