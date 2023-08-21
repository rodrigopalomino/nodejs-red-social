import { Request, Response } from "express";
import { Comentario } from "../interfaces/comentarioInterfaces";
import { createComent, getComent } from "../services/comentarioServices";
import { handleHttp } from "../utils/error.handle";

export const createComentario = async (req: Request, res: Response) => {
  const { post_id, user_id, contenido } = req.body;

  const comentario: Comentario = {
    post_id,
    user_id,
    contenido,
  };

  try {
    const response = await createComent(comentario);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createPublicacion", 400, error);
  }
};

export const getComentario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await getComent(id);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createPublicacion", 400, error);
  }
};
