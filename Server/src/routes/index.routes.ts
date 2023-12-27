import express from "express";
import UsersRoutes from './users/routes'
import SkillsRoutes from './skills/routes'
import ProjectsRoutes from './projects/routes'
import CategoryRoutes from './category/routes'
import LoggerDbRoutes from './loggerDb/routes'

const router = express.Router();

router.use('/users', UsersRoutes)
router.use('/skills', SkillsRoutes)
router.use('/project', ProjectsRoutes)
router.use('/category', CategoryRoutes)
router.use('/loggerDb', LoggerDbRoutes)

export default router;