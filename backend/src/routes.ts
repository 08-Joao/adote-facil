import { Router } from 'express'
import { createUserControllerInstance } from './controllers/user/create-user.js'
import { userLoginControllerInstance } from './controllers/user/user-login.js'
import { upload } from './config/multer.js'
import { createAnimalControllerInstance } from './controllers/animal/create-animal.js'
import { userAuthMiddlewareInstance } from './middlewares/user-auth.js'
import { getAvailableAnimalsControllerInstance } from './controllers/animal/get-available.js'
import { getUserAnimalsControllerInstance } from './controllers/animal/get-user-animals.js'
import { updateUserControllerInstance } from './controllers/user/update-user.js'
import { updateAnimalStatusControllerInstance } from './controllers/animal/update-animal-status.js'

const router = Router()

// TODO trocar rotas para plural
router.post(
  '/user',
  createUserControllerInstance.handle.bind(createUserControllerInstance),
)

router.patch(
  '/user',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  updateUserControllerInstance.handle.bind(updateUserControllerInstance),
)

router.post(
  '/login',
  userLoginControllerInstance.handle.bind(userLoginControllerInstance),
)

router.post(
  '/animal',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  upload.array('pictures', 5), // Middleware do multer para upload de até 5 arquivos
  createAnimalControllerInstance.handle.bind(createAnimalControllerInstance),
)

router.patch(
  '/animal/:id',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  updateAnimalStatusControllerInstance.handle.bind(
    updateAnimalStatusControllerInstance,
  ),
)

router.get(
  '/animals/available',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  getAvailableAnimalsControllerInstance.handle.bind(
    getAvailableAnimalsControllerInstance,
  ),
)

router.get(
  '/animals/user',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  getUserAnimalsControllerInstance.handle.bind(
    getUserAnimalsControllerInstance,
  ),
)

export { router }
