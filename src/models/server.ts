import express from "express";
import { Usuario } from "./usuarioModel";
import { Publicacion } from "./publicacionModel";
import { Like } from "./likeModel";
import { Comentario } from "./comentarioModel";
import { Mensaje } from "./mensajesModel";

class Server {
  private app: express.Application;
  private PORT: string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3001";
    this.listen();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Ejecutandose en el puerto ${this.PORT}`);
    });
  }

  async dbConnect() {
    try {
      await Usuario.sync();
      await Publicacion.sync();
      await Like.sync();
      await Comentario.sync();
      await Mensaje.sync();
    } catch (error) {
      console.log(error);
    }
  }
}

export default Server;
