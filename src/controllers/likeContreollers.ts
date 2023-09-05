import { Request, Response } from "express";
import { Like } from "../interfaces/like";
import { clike, getItem, cdislike, getItemDis } from "../services/likeServices";
import { handleHttp } from "../utils/error.handle";

export const getLike = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await getItem(id);
    res.status(response.status).json(response.item);
  } catch (error) {
    handleHttp(res, "error_getLike", 400, error);
  }
};

export const getdisLike = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await getItemDis(id);
    res.status(response.status).json(response.item);
  } catch (error) {
    handleHttp(res, "error_getLike", 400, error);
  }
};

export const createLike = async (req: Request, res: Response) => {
  const { user_id, post_id } = req.body;

  const like: Like = {
    user_id,
    post_id,
  };

  try {
    const response = await clike(like);
    res.status(response.status).json(response.msg);
  } catch (error) {
    handleHttp(res, "error_createPublicacion", 400, error);
  }
};

export const createDislike = async (req: Request, res: Response) => {
  const { user_id, post_id } = req.body;

  const like: Like = {
    user_id,
    post_id,
  };

  try {
    const response = await cdislike(like);
    res.status(response.status).json(response.msg);
  } catch (error) {
    handleHttp(res, "error_createPublicacion", 400, error);
  }
};
