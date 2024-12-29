import { Router } from "express";

import LoginController from '../controller/LoginController.js'

const routes = new Router();

routes.post('/', LoginController.store);

export default routes;