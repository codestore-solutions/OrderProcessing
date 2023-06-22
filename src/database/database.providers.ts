import { Sequelize } from 'sequelize-typescript';
import { constants } from '../assets/constants';
import * as wkx from 'wkx';
import * as Sequelize2 from 'sequelize';
import mysql2 from 'mysql2';
import { Order } from './entities/order.entity';
import { OrderStatusEntity } from './entities/order_status.entity';
import { OrderItem } from './entities/ordered_product';


const MODELS = [
    Order,
    OrderStatusEntity,
    OrderItem
];

export const databaseProviders = [
    {
        provide: constants.SEQUELIZE,
        useFactory: async () => {
            const env = process.env;
            Sequelize2.GEOMETRY.prototype._stringify = function _stringify(value, options) {
                return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
            }
            Sequelize2.GEOMETRY.prototype._bindParam = function _bindParam(value, options) {
                return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
            }
            Sequelize2.GEOGRAPHY.prototype._stringify = function _stringify(value, options) {
                return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
            }
            Sequelize2.GEOGRAPHY.prototype._bindParam = function _bindParam(value, options) {
                return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
            }

            const sequelize = new Sequelize({
                dialect: 'mysql',
                dialectModule: mysql2,
                host: env.DB_HOST,
                port: 3306,
                username: env.DB_USERNAME ,
                password: env.DB_PASSWORD,
                database: env.DATABASE,
                logging: false,
            });
            sequelize.addModels([...MODELS]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
