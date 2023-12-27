import express from "express";
import controller from './controller'
import { authHandler } from "@middlewares/authHandler";
import { validatorAddCategoryRequest } from "./validators/addCategory.validator";
import { validatorDeleteCategoryRequest } from "./validators/deleteCategory.validator";

const router = express.Router();

router.use(authHandler)


router.get('/getAll', controller.getAll);

router.post('/addCategory',
    validatorAddCategoryRequest, controller.addCategory
);

router.put('/updateCategory/:idCategory',
    validatorAddCategoryRequest, controller.updateCategory
);

router.delete('/deleteCategory/:idCategory',
    validatorDeleteCategoryRequest, controller.deleteCategory
);


export default router;
