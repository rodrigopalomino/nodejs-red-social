import { Request, Response, Router } from "express";

const router = Router();

router.get("/chat", (req: Request, res: Response) => res.send("todo bien"));

export { router };
