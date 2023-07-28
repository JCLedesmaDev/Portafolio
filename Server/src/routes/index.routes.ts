import express from "express";
import UsersRoutes from './users'
import TechnologiesRoutes from './technologies'
import ProjectsRoutes from './projects'

const router = express.Router();

router.use('/users', UsersRoutes)
router.use('/technology', TechnologiesRoutes)
router.use('/project', ProjectsRoutes)

export default router;