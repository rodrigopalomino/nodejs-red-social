import bcrypt from "bcrypt";
import { Usuario, UsuarioModel } from "../models/usuarioModel";
import { Usuario as UsuarioInterfaces } from "../interfaces/usuario";
import jwt from "jsonwebtoken";

const validation = (lista: (string | Date)[], indice: number) => {
  return lista[indice] == "" || lista[indice] == undefined
    ? "campo requerido"
    : "";
};

export const nuevoUsuario = async (usuario: UsuarioInterfaces) => {
  const propiedadesUsuario = [
    usuario.username,
    usuario.password,
    usuario.name,
    usuario.lastname,
    usuario.f_nacimiento,
  ];
  // const Asd = sequelize.q
  //verificar que todos los sean diferentes
  if (!propiedadesUsuario.every(Boolean)) {
    return {
      username: validation(propiedadesUsuario, 0),
      password: validation(propiedadesUsuario, 1),
      name: validation(propiedadesUsuario, 2),
      lastname: validation(propiedadesUsuario, 3),
      f_nacimiento: validation(propiedadesUsuario, 4),
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
