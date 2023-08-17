import bcrypt from "bcrypt";
import { Usuario, UsuarioModel } from "../models/usuarioModel";
import { Usuario as UsuarioInterfaces } from "../interfaces/usuarioInterfaces";
import jwt from "jsonwebtoken";

export const nuevoUsuario = async (usuario: UsuarioInterfaces) => {
  const propiedadesUsuario = [
    usuario.username,
    usuario.password,
    usuario.name,
    usuario.lastname,
    usuario.f_nacimiento,
  ];

  //verificar que todos los sean diferentes
  if (!propiedadesUsuario.every(Boolean)) {
    return {
      username:
        propiedadesUsuario[0] == "" || propiedadesUsuario[0] == undefined
          ? "campo requerido"
          : "",
      password:
        propiedadesUsuario[1] == "" || propiedadesUsuario[1] == undefined
          ? "campo requerido"
          : "",
      name:
        propiedadesUsuario[2] == "" || propiedadesUsuario[2] == undefined
          ? "campo requerido"
          : "",
      lastname:
        propiedadesUsuario[3] == "" || propiedadesUsuario[3] == undefined
          ? "campo requerido"
          : "",
      f_nacimiento:
        propiedadesUsuario[4] == "" || propiedadesUsuario[4] == undefined
          ? "campo requerido"
          : "",
      status: 400,
    };
  }

  if (await Usuario.findOne({ where: { username: usuario.username } })) {
    return { msg: "el usuario ya existe", status: 400 };
  }

  //cifrar la contraseña
  const hashPassword = await bcrypt.hash(usuario.password, 8);
  usuario.password = hashPassword;

  try {
    await Usuario.create<UsuarioModel>(usuario);
    return { msg: `el usuario ${usuario.username} a sido creado`, status: 200 };
  } catch (error) {
    return { msg: "Error al crear usuario", error, status: 400 };
  }
};

export const loginUsuario = async (username: string, password: string) => {
  if (![username, password].every(Boolean)) {
    return {
      username:
        username == "" || username == undefined ? "campo requerido" : "",
      password:
        password == "" || password == undefined ? "campo requerido" : "",
      status: 400,
    };
  }

  const user = await Usuario.findOne({ where: { username: username } });

  if (!user) {
    return {
      username: "El usuario no existe",
      password: "",
      status: 400,
    };
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return {
      username: "",
      password: "contraseña incorrecta",
      status: 400,
    };
  }

  const token = jwt.sign(
    {
      username,
      id: user.user_id,
    },
    process.env.SECRET_KEY || "contraseña"
  );

  return {
    msg: "ingreso exitoso",
    token,
    status: 200,
  };
};
