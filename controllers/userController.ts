import {Request, Response} from 'express';
import {UserRepository} from '../repositories/userRepository';

export class UserController {
    private readonly userRepository: UserRepository;

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository || new UserRepository();
    }

    checkUsername = async (req: Request, res: Response) => {
        try {
            const userName = req.body.username;
            const user = await this.userRepository.getUserByUserName(userName);
            const response = {
                isAvailable: !user
            };

            res.send(response);
        } catch (err) {
            return res.send(err);
        }
    };

    checkEmailAddress = async (req: Request, res: Response) => {
        try {
            const emailAddress = req.body.emailAddress;
            const user = await this.userRepository.getUserByEmailAddress(emailAddress)
            const response = {
                isAvailable: !user
            };

            return res.send(response);
        } catch (err) {
            return res.send(err);
        }
    };

    getUser = async (req: Request, res: Response) => {
        try {
            const userName = req.params.userName;
            const user = await this.userRepository.getUserByUserName(userName);
            if (!user) {
                res.send(Error('User not found in database'));
            }

            return res.send(user);
        } catch (err) {
            return res.send(err);
        }
    };

    createUser = async (req: Request, res: Response) => {
        try {
            const users = await this.userRepository.getAllPendingUsers();
            if (users && users.length && users.length >= 20) {
                return res.send({success: false});
            }

            await this.userRepository.addPendingUser(req.body)
            return res.send({success: true});

        } catch (err) {
            return res.send(err);
        }
    };

    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userRepository.getAllUsers();
            return res.send(users);
        } catch (err) {
            return res.send(err);
        }
    };
}