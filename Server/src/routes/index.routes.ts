import express from "express";
import UsersRoutes from './users'
import SkillsRoutes from './skills'
import ProjectsRoutes from './projects'
import CategoryRoutes from './category'

const router = express.Router();

router.use('/users', UsersRoutes)
router.use('/skills', SkillsRoutes)
router.use('/project', ProjectsRoutes)
router.use('/category', CategoryRoutes)

export default router;