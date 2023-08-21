import sequelize from "../db/connection";
import { Publicacion as PublicacionInterfaces } from "../interfaces/publicacionInterfaces";
import { Publicacion } from "../models/publicacionModel";
import { Usuario } from "../models/usuarioModel";

export const getItems = async () => {
  const items = await Publicacion.findAll({
    include: [{ model: Usuario, attributes: ["username"] }],
    attributes: {
      exclude: ["user_id"],
    },
  });

  return { items, status: 200 };
};

export const getItem = async (post_id: string) => {
  const item = await Publicacion.findOne({
    where: { post_id: post_id },
    include: [{ model: Usuario, attributes: [] }],
    attributes: {
      exclude: ["user_id"],
      include: [[sequelize.col("Usuario.username"), "username"]],
    },
  });
  return { item, status: 200 };
};

export const createPost = async (publicacion: PublicacionInterfaces) => {
  const PropiedadesPublicacion = [publicacion.user_id, publicacion.contenido];

  if (!PropiedadesPublicacion.every(Boolean)) {
    return {
      user_id:
        PropiedadesPublicacion[0] == "" ||
        PropiedadesPublicacion[0] == undefined
          ? "campo requerido"
          : "",
      contenido:
        PropiedadesPublicacion[1] == "" ||
        PropiedadesPublicacion[1] == undefined
          ? "campo requerido"
          : "",
      status: 400,
    };
  }

  await Publicacion.create(publicacion);
  return { msg: "publicacion creada", status: 200 };
};
