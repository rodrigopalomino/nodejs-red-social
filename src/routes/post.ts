import { Router } from "express";
import {
  createLike,
  createPublicacion,
  getPublicacion,
  getPublicaciones,
} from "../controllers/publicacionesControllers";

const router = Router();

router.get("/", getPublicaciones);
router.get("/:id", getPublicacion);

router.post("/create", createPublicacion);

export { router };
