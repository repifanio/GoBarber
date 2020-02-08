import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';


import userController from './app/controllers/userController';
import sessionController from './app/controllers/sessionController';
import fileController from './app/controllers/fileController';
import providerController from './app/controllers/providerController';
import appointmentController from './app/controllers/appointmentController';
import scheduleController from './app/controllers/scheduleController';
import notificationController from './app/controllers/notificationController';

import authMiddleware from './app/middlewares/auth';
import availableController from './app/controllers/availableController';

const routes = Router();
const uploads = multer(multerConfig);

routes.post('/users', userController.store);
routes.post('/session', sessionController.store);

routes.use(authMiddleware);

routes.put('/users/:id', userController.update);
routes.get('/users', userController.index);

routes.get('/providers', providerController.index);
routes.get('/providers/:providerId/available', availableController.index);

routes.post('/appointments', appointmentController.store);
routes.get('/appointments', appointmentController.index);
routes.delete('/appointments/:id', appointmentController.delete);


routes.get('/schedules', scheduleController.index);

routes.post('/files', uploads.single('file'), fileController.store);

routes.get('/notifications', notificationController.index);
routes.put('/notifications/:id', notificationController.update);

export default routes;
