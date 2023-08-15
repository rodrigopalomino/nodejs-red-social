import { Sequelize } from "sequelize";

const sequelize = new Sequelize("red_social", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
