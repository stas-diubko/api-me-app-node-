import * as jwt from "jwt-then";
import config from "../config/config";
import RoleService from '../apiV1/roles/roles.service';

var roleService = new RoleService();

const verifyAdmin = async (req, res, next): Promise<Response> => {
  if (!req.headers.authorization)
    return res.status(403).send({ auth: false, message: "No token provided." });

  const token: string = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  try {
    const decoded = await jwt.verify(token, config.JWT_ENCRYPTION);
    const queryRole = await roleService.getByUserId(decoded.id);
    if (!queryRole.isAdmin) return res.status(401).send({ auth: false, message: "Unauthorized." });
    next();
  } catch (err) {
    res.status(500).send({ auth: false, message: err });
  }
};

export default verifyAdmin;