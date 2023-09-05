export interface Publicacion {
  post_id?: number;
  user_id: number;
  titulo: string;
  contenido: string;
  cantidad_likes?: number;
  cantidad_dislikes?: number;
  cantidad_comentarios?: number;
}
