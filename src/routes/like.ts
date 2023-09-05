import { Router } from "express";
import {
  createDislike,
  createLike,
  getLike,
  getdisLike,
} from "../controllers/likeContreollers";

const router = Router();

router.get("/like/:id", getLike);
router.get("/dislike/:id", getdisLike);
router.post("/createLike", createLike);
router.post("/createDislike", createDislike);

export { router };
