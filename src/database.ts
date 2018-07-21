import { Sequelize } from 'sequelize-typescript';
import { SequelizeConfig } from 'sequelize-typescript/lib/types/SequelizeConfig';

import * as config from './config';

export class Database {
    protected instance: Sequelize;
    protected static readonly sequelizeConfig: SequelizeConfig = {
        host: config.DB_HOST,
        database: config.DB_NAME!,
        dialect: "mysql",
        username: config.DB_USERNAME!,
        password: config.DB_PASSWORD!,
        modelPaths: [__dirname + "/models/*.model.ts"]
    };

    constructor() {
        this.instance = new Sequelize(Database.sequelizeConfig);
    }
}

let database: Database;

function getDatabase() {
    if (!database) database = new Database();
    return database;
}

export default getDatabase;