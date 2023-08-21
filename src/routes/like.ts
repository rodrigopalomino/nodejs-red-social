import { Router } from "express";
import {
  createDislike,
  createLike,
  getLike,
  getLikes,
  getdisLike,
} from "../controllers/likeContreollers";

const router = Router();

router.get("", getLikes);
router.get("/like/:id", getLike);

// router.get("/dislikes", getLikes);
router.get("/dislike/:id", getdisLike);

router.post("/createLike", createLike);
router.post("/createDislike", createDislike);

export { router };
