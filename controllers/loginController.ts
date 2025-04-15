import {Settings} from '../services/settings';
import {Request, Response, Router} from 'express';
import bcrypt from 'bcryptjs';
import {ResponseBuilder} from '../services/response';
import {UserRepository} from '../repositories/userRepository';
import {Controller} from "./controller";


export class LoginController implements Controller {
    private readonly userRepository: UserRepository;

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository || new UserRepository();
    }

    registerRoutes = (router: Router) => {
        router.post('/login', this.login);
        router.post('/chat-login', this.chatLogin);
    }

    login = async (req: Request, res: Response) => {
        try {
            let {userName, password} = req.body;
            userName = userName.toLowerCase();
            const user = await this.userRepository.getUserByUserName(userName);
            const result = await bcrypt.compare(password, user.password);

            if (result) {
                return res.send({userId: user._id, success: true});
            } else {
                return res.send({userId: null, success: false});
            }
        } catch (err) {
            res.status(500);
            return res.send(ResponseBuilder.buildExceptionResponse(err));
        }
    };

    chatLogin = async (req: Request, res: Response) => {
        try {
            let {userName, password} = req.body;
            userName = userName.toLowerCase();
            const user = await this.userRepository.getChatUser(userName);
            const isSame = await bcrypt.compare(password, user.password);

            if (isSame) {
                res.send({userId: user._id, success: true, socketUrl: Settings.socketUrl()});
            } else {
                res.send({userId: null, success: false, socketUrl: ''});
            }
        } catch (err) {
            res.status(500);
            return res.send(ResponseBuilder.buildExceptionResponse(err));
        }
    };
}