import express from "express";
import { addCategory, deleteCategory, getAll, updateCategory } from './controller'
import { authHandler } from "@middlewares/authHandler";
import { validatorAddCategoryRequest } from "./validators/addCategory.validator";
import { validatorDeleteCategoryRequest } from "./validators/deleteCategory.validator";

const router = express.Router();

router.use(authHandler)


router.get('/getAll', getAll);

router.post('/addCategory', validatorAddCategoryRequest, addCategory);

router.put('/updateCategory/:idCategory',
    validatorAddCategoryRequest, updateCategory
);

router.delete('/deleteCategory/:idCategory',
    validatorDeleteCategoryRequest, deleteCategory
);


export default router;
