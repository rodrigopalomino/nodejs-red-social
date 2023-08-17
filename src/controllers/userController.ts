import { Request, Response } from "express";
import { loginUsuario, nuevoUsuario } from "../services/userServices";
import { Usuario } from "../interfaces/usuarioInterfaces";
import { handleHttp } from "../utils/error.handle";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const response = await loginUsuario(username, password);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_signIn_user", 400, error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { username, password, name, lastname, f_nacimiento } = req.body;

  const usuario: Usuario = {
    username,
    password,
    name,
    lastname,
    f_nacimiento: new Date(f_nacimiento),
  };

  try {
    const response = await nuevoUsuario(usuario);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_signIn_user", 400, error);
  }
};
