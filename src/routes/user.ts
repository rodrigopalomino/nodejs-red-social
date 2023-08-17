import { Request, Response, Router } from "express";
import { login, signIn } from "../controllers/userController";

const router = Router();

router.post("/login", login);
router.post("/signIn", signIn);

export { router };
