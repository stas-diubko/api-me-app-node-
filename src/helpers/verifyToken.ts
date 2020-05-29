import * as jwt from "jwt-then";
import config from "../config/config";
import UserService from '../apiV1/users/user.service';

var userService = new UserService();

const verifyToken = async (req, res, next): Promise<Response> => {
  const token: string = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }
  try {
    const decoded = await jwt.verify(token, config.JWT_ENCRYPTION);
    const user = await userService.getById(decoded.id);
    if(!user) {
      return res.status(404).send('User not found!');
    }
    req.body.id = (<any>decoded).id;
    next();
  } catch (err) {
    res.status(500).send({ auth: false, message: err });
  }
};

export default verifyToken;