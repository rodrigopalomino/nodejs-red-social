export interface Publicacion {
  post_id: number;
  user_id: number;
  contenido: string;
  f_publicacion: Date;
  cantidad_likes: number;
  cantidad_dislikes: number;
  cantidad_comentarios: number;
}
