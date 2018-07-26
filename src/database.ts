import { Sequelize } from 'sequelize-typescript';
import { SequelizeConfig } from 'sequelize-typescript/lib/types/SequelizeConfig';

import * as config from './config';
import { Attendant } from './models/attendant.model';

export interface SequelizeCustomResult {
    item: any;
    created: boolean;
}

export class Database {
    protected instance: Sequelize;

    protected static readonly sequelizeConfig: SequelizeConfig = {
        host: config.DB_HOST,
        database: config.DB_NAME!,
        dialect: "mysql",
        username: config.DB_USERNAME!,
        password: config.DB_PASSWORD!,
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        logging: false
    };

    constructor() {
        this.instance = new Sequelize(Database.sequelizeConfig);
        this.instance.addModels([Attendant]);
        Attendant.sync({ alter: true });
    }
    
    /**
     * Update model if exist, else create
     * @param model Model type
     * @param where Sequelize `where` object
     * @param newItem Model item which will update or create
     * @see https://stackoverflow.com/questions/18304504/create-or-update-sequelize
     */
    public updateOrCreate (model, where, newItem) {
        return model
        .findOne({where: where})
        .then(function (foundItem) {
            if (!foundItem) {
                return model
                    .create(newItem)
                    .then(function (item) { return  {item: item, created: true} as SequelizeCustomResult; })
            }
             // Found an item, update it
            return model
                .update(newItem, {where: where})
                .then(function (item) { return {item: item, created: false} as SequelizeCustomResult });
        });
    }
}

let database: Database;

function getDatabase() {
    if (!database) database = new Database();
    return database;
}

export default getDatabase;