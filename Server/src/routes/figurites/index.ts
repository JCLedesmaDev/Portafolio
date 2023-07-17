import express from 'express'
import { authHandler } from '../../middlewares/authHandler'
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from '../../middlewares/mockHandler'
import { buyFigurine, createFigurine, deleteFigurine, updateFigurine } from './controller'
import { validatorBuyFigurine } from './validators/buyFigurine'
import { validatorCreateFigurine } from './validators/createFigurites'
import { validatorDeleteFigurine } from './validators/deleteFigurites'
import { validatorUpdateFigurine } from './validators/updateFigurine'

const router = express.Router()

router.use(authHandler)
router.use(mockHandler)

router.post('/createFigurine', checkRolesHandler(), validatorCreateFigurine, createFigurine)

router.put('/updateFigurine/:id', checkRolesHandler(), validatorUpdateFigurine, updateFigurine)

router.delete('/deleteFigurine/:id', checkRolesHandler(), validatorDeleteFigurine, deleteFigurine)

router.post('/buyFigurine', checkRolesHandler(['User']), validatorBuyFigurine, buyFigurine)


export default router