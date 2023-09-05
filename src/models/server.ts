import express from "express";
import { Usuario } from "./usuarioModel";
import { Publicacion } from "./publicacionModel";
import { Like } from "./likeModel";
import { Comentario } from "./comentarioModel";
import { Mensaje } from "./mensajesModel";
import { router } from "../routes";
import cors from "cors";
import { Dislike } from "./dislikeModel";
import { General } from "./generalModel";

class Server {
  private app: express.Application;
  private PORT: string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3001";
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Ejecutandose en el puerto ${this.PORT}`);
    });
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(router);
  }

  async dbConnect() {
    try {
      await Usuario.sync();
      await Publicacion.sync();
      await Like.sync();
      await Comentario.sync();
      await Mensaje.sync();
      await Dislike.sync();
      await General.sync();
    } catch (error) {
      console.log(error);
    }
  }
}

export default Server;
