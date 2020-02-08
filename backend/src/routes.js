import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';


import userController from './app/controllers/userController';
import sessionController from './app/controllers/sessionController';
import fileController from './app/controllers/fileController';
import providerController from './app/controllers/providerController';
import appointmentController from './app/controllers/appointmentController';
import scheduleController from './app/controllers/scheduleController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
const uploads = multer(multerConfig);

routes.post('/users', userController.store);
routes.post('/session', sessionController.store);

routes.use(authMiddleware);

routes.put('/users/:id', userController.update);
routes.get('/users', userController.index);

routes.get('/providers', providerController.index);

routes.post('/appointments', appointmentController.store);
routes.get('/appointments', appointmentController.index);

routes.get('/schedules', scheduleController.index);

routes.post('/files', uploads.single('file'), fileController.store);

export default routes;
