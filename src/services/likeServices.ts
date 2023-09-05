import { Like as Likeinterfaces } from "../interfaces/like";
import { Dislike } from "../models/dislikeModel";
import { Like } from "../models/likeModel";
import { Publicacion } from "../models/publicacionModel";

const validation = (lista: (string | number)[], indice: number) => {
  return lista[indice] == "" || lista[indice] == undefined
    ? "campo requerido"
    : "";
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
      user_id: validation(PropiedadesLike, 0),
      post_id: validation(PropiedadesLike, 1),
      status: 400,
    };
  }

  const dislike = await Dislike.findOne({
    where: { user_id: like.user_id, post_id: like.post_id },
  });

  if (dislike) {
    await Dislike.destroy({
      where: { user_id: like.user_id, post_id: like.post_id },
    });
    await Publicacion.decrement("cantidad_dislikes", {
      where: { post_id: dislike.post_id },
    });
  }

  const prueba = await Like.findOne({
    where: { user_id: like.user_id, post_id: like.post_id },
  });

  if (!prueba) {
    await Like.create(like);
    await Publicacion.increment("cantidad_likes", {
      where: { post_id: like.post_id },
    });
    return { msg: "like creado", status: 200 };
  }

  await Like.destroy({
    where: { user_id: like.user_id, post_id: like.post_id },
  });
  await Publicacion.decrement("cantidad_likes", {
    where: { post_id: like.post_id },
  });
  return { msg: "like borrada", status: 200 };
};

export const cdislike = async (dislike: Likeinterfaces) => {
  const PropiedadesDislike = [dislike.user_id, dislike.post_id];

  if (!PropiedadesDislike.every(Boolean)) {
    return {
      user_id: validation(PropiedadesDislike, 0),
      post_id: validation(PropiedadesDislike, 1),
      status: 400,
    };
  }

  const like = await Like.findOne({
    where: { user_id: dislike.user_id, post_id: dislike.post_id },
  });

  if (like) {
    await Like.destroy({
      where: { user_id: dislike.user_id, post_id: dislike.post_id },
    });
    await Publicacion.decrement("cantidad_likes", {
      where: { post_id: like.post_id },
    });
  }

  const prueba = await Dislike.findOne({
    where: { user_id: dislike.user_id, post_id: dislike.post_id },
  });

  if (!prueba) {
    await Dislike.create(dislike);
    await Publicacion.increment("cantidad_dislikes", {
      where: { post_id: dislike.post_id },
    });
    return { msg: "dislike creado", status: 200 };
  }

  await Dislike.destroy({
    where: { user_id: dislike.user_id, post_id: dislike.post_id },
  });
  await Publicacion.decrement("cantidad_dislikes", {
    where: { post_id: dislike.post_id },
  });
  return { msg: "dislike borrada", status: 200 };
};
