import express from "express";
import UsersRoutes from './users'

const router = express.Router();

router.use('/users', UsersRoutes)
// router.use('/project', )
// router.use('/technology', )

export default router;