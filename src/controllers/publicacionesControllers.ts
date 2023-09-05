import { Request, Response } from "express";
import { createPost, getItems } from "../services/publicacionesServices";
import { Publicacion } from "../interfaces/publicacion";
import { handleHttp } from "../utils/error.handle";

export const getPublicaciones = async (req: Request, res: Response) => {
  try {
    const response = await getItems();
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getPublicaciones", 400, error);
  }
};

export const createPublicacion = async (req: Request, res: Response) => {
  const { user_id, contenido, titulo } = req.body;

  const publicacion: Publicacion = {
    user_id,
    titulo,
    contenido,
  };

  try {
    const response = await createPost(publicacion);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createPublicacion", 400, error);
  }
};
