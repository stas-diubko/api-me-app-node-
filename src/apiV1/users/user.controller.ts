import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import UserService from './user.service';
import RoleService from '../roles/roles.service';

export default class UserController {
    
    constructor(
        private userService: UserService,
        private roleService: RoleService
    ){
        
    }

    findMany = async (req: Request, res: Response): Promise<Response> => {
        try {
            let number: string = req.query.number.toString();
            let count: string = req.query.count.toString();
            const userData = await this.userService.getMany(number, count);
            return res.status(200).send(userData);
        } catch (error) {
            return res.status(500).send(error.toString());
        }
    };

    findOne = async (req: Request, res: Response): Promise<Response> => {
        try {
            const queryUser = await this.userService.getById(req.body.id);
            if(!queryUser) {
                return res.status(404).send('User not found!');
            };
            return res.status(200).send(queryUser);
        } catch (error) {
            return res.status(500).send(error.toString());
        }
    };

    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const queryUser = await this.userService.getByEmail(req.body.email);
            if(queryUser) {
                return res.status(409).send('User exists!');
            };
            const newUser = await this.userService.createUser(req.body);
            return res.status(200).send(newUser);
        } catch (error) {
            return res.status(500).send(error.toString());
        };
    }

    logIn = async (req: Request, res: Response): Promise<Response> => {
        try {
            const queryUser = await this.userService.getByEmail(req.body.email);
            if(!queryUser) {
                return res.status(404).send('User not found!');
            };
            const matchPasswords = await bcrypt.compare(req.body.password, queryUser.password);
            if (!matchPasswords) {
                return res.status(401).send('Not authorized!');
            };
            const dataLogin = await this.userService.logIn(queryUser._id);
            return res.status(200).send(dataLogin);
        } catch (error) {
            return res.status(500).send(error.toString());
        };
    };
    
    update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const queryUser = await this.userService.getById(req.body.id);
            if(!queryUser) {
                return res.status(404).send('User not found!');
            };
            const updatedUser = await this.userService.update(req.body, req.body.id);
            return res.status(200).send(updatedUser);
        } catch (error) {
            return res.status(500).send(error.toString());
        };
    };

    updateUsersRole = async (req: Request, res: Response): Promise<Response> => {
        try {
            const queryUser = await this.userService.getById(req.body.userId);
            if(!queryUser) {
                return res.status(404).send('User not found!');
            };
            await this.roleService.update(req.body);
            return res.status(200).send();
        } catch (error) {
            return res.status(500).send(error.toString());
        };
    };

    remove = async (req: Request, res: Response): Promise<Response> => {
        try {
            await this.userService.remove(req.body.id);
            return res.status(200).send();
        } catch (error) {
            return res.status(500).send(error.toString()); 
        };
    };
}