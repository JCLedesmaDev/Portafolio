import express from "express";
import UsersRoutes from './/users'
import AlbumesRoutes from './/albumes'

const router = express.Router();

router.use('/users', UsersRoutes)
router.use('/project', AlbumesRoutes)
router.use('/technology', AlbumesRoutes)

export default router;