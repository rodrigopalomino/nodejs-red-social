import sequelize from "../db/connection";
import { Comentario as ComentarioInterfaces } from "../interfaces/comentario";
import { Comentario } from "../models/comentarioModel";
import { Usuario } from "../models/usuarioModel";

const validation = (lista: (string | number)[], indice: number) => {
  return lista[indice] == "" || lista[indice] == undefined
    ? "campo requerido"
    : "";
};

export const createComent = async (comentario: ComentarioInterfaces) => {
  const propiedadesComentario = [
    comentario.post_id,
    comentario.user_id,
    comentario.contenido,
  ];
  if (!propiedadesComentario.every(Boolean)) {
    return {
      post_id: validation(propiedadesComentario, 0),
      user_id: validation(propiedadesComentario, 1),
      contenido: validation(propiedadesComentario, 2),
      status: 400,
    };
  }

  await Comentario.create(comentario);
  return { msg: "comentario creado", status: 200 };
};

export const getComent = async (post_id: string) => {
  const items = await Comentario.findAll({
    where: { post_id: post_id },
    include: [{ model: Usuario, attributes: ["username"] }],
    attributes: {
      exclude: ["user_id"],
    },
  });
  return { items, status: 200 };
};
