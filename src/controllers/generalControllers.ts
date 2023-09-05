import { Request, Response } from "express";
import { createComent, getComent } from "../services/generalServices";
import { General } from "../interfaces/general";
import { handleHttp } from "../utils/error.handle";

export const createComentario = async (req: Request, res: Response) => {
  const { user_id, contenido } = req.body;
  const comentario: General = {
    user_id,
    contenido,
  };

  try {
    const response = await createComent(comentario);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_general_createComentario", 400, error);
  }
};

export const getComentarios = async (req: Request, res: Response) => {
  try {
    const response = await getComent();
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_general_createComentario", 400, error);
  }
};
