import { Router } from "express";
import users from "./users/user.route";

const router: Router = Router();

router.use("/env", (req, res) => {
    res.json(process.env);
});

router.use("/users", users);

export default router;