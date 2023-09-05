import { Request, Response, Router } from "express";
import {
  createComentario,
  getComentarios,
} from "../controllers/generalControllers";

const router = Router();

router.get("/", getComentarios);
router.post("/create", createComentario);

export { router };
