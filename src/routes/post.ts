import { Router } from "express";
import {
  createPublicacion,
  getPublicaciones,
} from "../controllers/publicacionesControllers";

const router = Router();

router.get("/", getPublicaciones);

router.post("/create", createPublicacion);

export { router };
