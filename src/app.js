import express from 'express';

import RegisterRoutes from './app/routes/Register.js';
import LoginRoutes from './app/routes/Login.js';
import './config/database.js';

class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/register', RegisterRoutes);
        this.app.use('/login', LoginRoutes);
    }
}

export default new App().app;