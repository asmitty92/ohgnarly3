import {Router} from 'express';
import {HomeController} from '../controllers/homeController';
import {LoginController} from '../controllers/loginController';
import {MovieController} from '../controllers/movieController';
import {MessageController} from '../controllers/messageController';
import {UserController} from '../controllers/userController';
import {PersonController} from '../controllers/personController';
import { Server } from 'socket.io';


export class Routes {
    io: Server;
    movieController: MovieController;
    messageController: MessageController;
    userController: UserController;
    loginController: LoginController;
    personController: PersonController;
    homeController: HomeController;

    constructor(io: Server) {
        this.io = io;
        this.movieController = new MovieController();
        this.messageController = new MessageController(io);
        this.userController = new UserController();
        this.loginController = new LoginController();
        this.personController = new PersonController();
        this.homeController = new HomeController();
    }

    configureRoutes = (router: Router) => {
        this.loginController.registerRoutes(router);
        this.userController.registerRoutes(router);
        this.messageController.registerRoutes(router);
        this.movieController.registerRoutes(router);
        this.personController.registerRoutes(router);
        this.homeController.registerRoutes(router);

        return router;
    }
}
