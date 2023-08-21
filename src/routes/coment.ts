import { Router } from "express";
import {
  createComentario,
  getComentario,
} from "../controllers/comentarioControllers";

const router = Router();

router.post("/create", createComentario);
router.get("/:id", getComentario);

export { router };
