import express from "express";
import UsersRoutes from './users'
import SkillsRoutes from './skills'
import ProjectsRoutes from './projects'

const router = express.Router();

router.use('/users', UsersRoutes)
router.use('/skills', SkillsRoutes)
router.use('/project', ProjectsRoutes)

export default router;