import express from "express";
import UsersRoutes from './/users'
import AlbumesRoutes from './/albumes'
import FiguritesRoutes from './/figurites'
import AlbumCollectionRoutes from './/albumCollections'
const router = express.Router();

router.use('/albumes', AlbumesRoutes)
router.use('/users', UsersRoutes)
router.use('/figurites', FiguritesRoutes)
router.use('/albumCollections', AlbumCollectionRoutes)


export default router;