import { Like as Likeinterfaces } from "../interfaces/likeInterfaces";
import { Dislike } from "../models/dislikeModel";
import { Like } from "../models/likeModel";
import { Publicacion } from "../models/publicacionModel";

export const getItems = async () => {
  const items = await Like.findAll();
  return { items, status: 200 };
};

export const getItem = async (user_id: string) => {
  const item = await Like.findAll({ where: { user_id: user_id } });
  return { item, status: 200 };
};

export const getItemDis = async (user_id: string) => {
  const item = await Dislike.findAll({ where: { user_id: user_id } });
  return { item, status: 200 };
};

export const clike = async (like: Likeinterfaces) => {
  const PropiedadesLike = [like.user_id, like.post_id];

  if (!PropiedadesLike.every(Boolean)) {
    return {
      user_id:
        PropiedadesLike[0] == 0 || PropiedadesLike[0] == undefined
          ? "campo requerido"
          : "",
      contenido:
        PropiedadesLike[1] == 0 || PropiedadesLike[1] == undefined
          ? "campo requerido"
          : "",
      status: 400,
    };
  }

  const dislike = await Dislike.findOne({
    where: { user_id: like.user_id, post_id: like.post_id },
  });

  let aca = "no se borro nada";

  if (dislike) {
    await Dislike.destroy({
      where: { user_id: like.user_id, post_id: like.post_id },
    });
    await Publicacion.decrement("cantidad_dislikes", {
      where: { post_id: dislike.post_id },
    });
    aca = "se borro un dislike";
  }

  const prueba = await Like.findOne({
    where: { user_id: like.user_id, post_id: like.post_id },
  });

  if (!prueba) {
    await Like.create(like);
    await Publicacion.increment("cantidad_likes", {
      where: { post_id: like.post_id },
    });
    return { msg: "like creado => ", aca, prueba, status: 200 };
  }

  await Like.destroy({
    where: { user_id: like.user_id, post_id: like.post_id },
  });
  await Publicacion.decrement("cantidad_likes", {
    where: { post_id: like.post_id },
  });
  return { msg: "like borrada => ", aca, status: 200 };
};

export const cdislike = async (dislike: Likeinterfaces) => {
  const PropiedadesLike = [dislike.user_id, dislike.post_id];

  if (!PropiedadesLike.every(Boolean)) {
    return {
      user_id:
        PropiedadesLike[0] == 0 || PropiedadesLike[0] == undefined
          ? "campo requerido"
          : "",
      contenido:
        PropiedadesLike[1] == 0 || PropiedadesLike[1] == undefined
          ? "campo requerido"
          : "",
      status: 400,
    };
  }

  const like = await Like.findOne({
    where: { user_id: dislike.user_id, post_id: dislike.post_id },
  });

  let aca = "no se borro nada";

  if (like) {
    await Like.destroy({
      where: { user_id: dislike.user_id, post_id: dislike.post_id },
    });
    await Publicacion.decrement("cantidad_likes", {
      where: { post_id: like.post_id },
    });
    aca = "aca se borro un like";
  }

  const prueba = await Dislike.findOne({
    where: { user_id: dislike.user_id, post_id: dislike.post_id },
  });

  if (!prueba) {
    await Dislike.create(dislike);
    await Publicacion.increment("cantidad_dislikes", {
      where: { post_id: dislike.post_id },
    });
    return { msg: "dislike creado => ", aca, prueba, status: 200 };
  }

  await Dislike.destroy({
    where: { user_id: dislike.user_id, post_id: dislike.post_id },
  });
  await Publicacion.decrement("cantidad_dislikes", {
    where: { post_id: dislike.post_id },
  });
  return { msg: "dislike borrada => ", aca, status: 200 };
};
