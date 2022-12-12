import { connect } from "mongoose";
import Logger from "./logger";

export default class Conection {
  private db_conection_string: string;

  constructor(db_conection_string: string) {
    this.db_conection_string = db_conection_string;
  }

  async createConection() {
    try {
      await connect(this.db_conection_string);
      Logger.info("😄 Conectado com sucesso ao banco de dados!");
    } catch (error) {
      Logger.error("😕 Falha ao conectar ao banco de dados.");
    }
  }
}

// import { Sequelize } from "sequelize";
// import authDB from "./default";

// export const db: Sequelize = new Sequelize(
// authDB.database,
// authDB.user,
// authDB.pass,
// {
//     host: authDB.host,
//     dialect: 'mysql',
//     logging: console.log
// }
// );
