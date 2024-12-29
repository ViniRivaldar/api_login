import { Router } from "express";

import RegisterController from '../controller/RegisterContoller.js';
import AuthMiddleware from "../../utils/AuthMiddleware.js";

const routes = new Router();

routes.post('/', RegisterController.store);
routes.put('/:id', AuthMiddleware,  RegisterController.update);
routes.delete('/:id', AuthMiddleware,  RegisterController.delete);

export default routes;