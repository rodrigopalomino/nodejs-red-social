import { Model } from "sequelize";
import { General as GeneralInterfaces } from "../interfaces/general";
import { General } from "../models/generalModel";
import { Usuario } from "../models/usuarioModel";

const validation = (lista: (string | number)[], indice: number) => {
  return lista[indice] == "" || lista[indice] == undefined
    ? "campo requerido"
    : "";
};

export const createComent = async (comentario: GeneralInterfaces) => {
  const campos = [comentario.user_id, comentario.contenido];

  if (!campos.every(Boolean)) {
    return {
      user_id: validation(campos, 0),
      contenido: validation(campos, 1),
      status: 400,
    };
  }

  await General.create(comentario);

  return {
    msg: "general_comentario creado",
    status: 200,
  };
};

export const getComent = async () => {
  const items = await General.findAll({
    include: [{ model: Usuario, attributes: ["username"] }],
  });
  return {
    items,
    status: 200,
  };
};
