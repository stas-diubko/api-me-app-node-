import { Router } from "express";
import users from "./users/user.route";
import notes from './notes/notes.route';

const router: Router = Router();

router.use("/env", (req, res) => {
    res.json(process.env);
});

router.use("/users", users);

router.use("/notes", notes);

export default router;