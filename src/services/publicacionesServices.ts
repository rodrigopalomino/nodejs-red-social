import sequelize from "../db/connection";
import { Publicacion as PublicacionInterfaces } from "../interfaces/publicacion";
import { Publicacion } from "../models/publicacionModel";
import { Usuario } from "../models/usuarioModel";

const validation = (lista: (string | number)[], indice: number) => {
  return lista[indice] == "" || lista[indice] == undefined
    ? "campo requerido"
    : "";
};

export const getItems = async () => {
  const items = await Publicacion.findAll({
    include: [{ model: Usuario, attributes: ["username"] }],
    attributes: {
      exclude: ["user_id"],
    },
    order: [["post_id", "DESC"]],
  });

  return { items, status: 200 };
};

export const createPost = async (publicacion: PublicacionInterfaces) => {
  const PropiedadesPublicacion = [
    publicacion.user_id,
    publicacion.titulo,
    publicacion.contenido,
  ];

  if (!PropiedadesPublicacion.every(Boolean)) {
    return {
      user_id: validation(PropiedadesPublicacion, 0),
      titulo: validation(PropiedadesPublicacion, 1),
      contenido: validation(PropiedadesPublicacion, 2),
      status: 400,
    };
  }

  await Publicacion.create(publicacion);
  return { msg: "publicacion creada", status: 200 };
};
