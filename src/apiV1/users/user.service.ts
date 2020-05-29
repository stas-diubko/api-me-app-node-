import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import * as bcrypt from 'bcrypt';
import config from '../../config/config';
import User from './user.model';
import Roles from '../roles/roles.model';
import { CreateUserRequestModel } from '../../models/users/createUserRequestModel';
import { UserLoginRequestModel } from '../../models/users/userLoginRequestModel';
import { UserModel } from '../../models/users/userResponseModel';
import { UserLoginResponseModel } from '../../models/users/userLoginResponseModel';

export default class UserService {
    createUser = async (createUserData: CreateUserRequestModel): Promise<UserModel> => {
        const hash = await bcrypt.hash(createUserData.password, config.SALT_ROUNDS);
        const user = new User({
            name: createUserData.name,
            surname: createUserData.surname,
            email: createUserData.email,
            password: hash
        });
        const role = new Roles();
        const newUser = await user.save();
        role.userId = newUser._id;
        await role.save();
        return newUser;
    };
    
    logIn = async (userId: string): Promise<UserLoginResponseModel> => {
        const token = await jwt.sign( {id: userId}, config.JWT_ENCRYPTION, {
            expiresIn: config.JWT_EXPIRATION
        });
        return { token };
    }

    update = async (userData: any, id: string): Promise<any> => {
        const updatedUser = await User.findByIdAndUpdate({ _id: id }, userData);
        return updatedUser;
    };

    getByEmail = async (userEmail: string): Promise<UserModel> => {
        const queryUser = await User.findOne({email: userEmail});
        if (queryUser) return queryUser;
    };

    getById = async (id: string): Promise<UserModel> => {
        const queryUser = await User.findOne({_id: id});
        if (queryUser) return queryUser;
    };

    remove = async (id: string): Promise<void> => {
        await User.findOneAndRemove({_id: id});
        await Roles.findOneAndRemove({userId: id});
    };
}