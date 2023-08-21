import sequelize from "../db/connection";
import { Comentario as ComentarioInterfaces } from "../interfaces/comentarioInterfaces";
import { Comentario } from "../models/comentarioModel";
import { Usuario } from "../models/usuarioModel";

export const createComent = async (comentario: ComentarioInterfaces) => {
  const propiedadesComentario = [
    comentario.post_id,
    comentario.user_id,
    comentario.contenido,
  ];
  if (!propiedadesComentario.every(Boolean)) {
    return {
      post_id:
        propiedadesComentario[0] == "" || propiedadesComentario == undefined
          ? "campo requerido"
          : "",

      user_id:
        propiedadesComentario[0] == "" || propiedadesComentario == undefined
          ? "campo requerido"
          : "",
      contenido:
        propiedadesComentario[0] == "" || propiedadesComentario == undefined
          ? "campo requerido"
          : "",
      status: 400,
    };
  }

  await Comentario.create(comentario);
  return { msg: "comentario creado", status: 200 };
};

export const getComent = async (post_id: string) => {
  const comentarios = await Comentario.findAll({
    where: { post_id: post_id },
    include: [{ model: Usuario, attributes: ["username"] }],
    attributes: {
      exclude: ["user_id"],
    },
  });
  return { comentarios, status: 200 };
};
