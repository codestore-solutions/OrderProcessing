import { Sequelize } from 'sequelize-typescript';
import { constants } from '../assets/constants';
import * as wkx from 'wkx';
import * as Sequelize2 from 'sequelize';
import mysql2 from 'mysql2';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Payment } from './entities/payment.entity';
import { Address } from './entities/address.entity';
import { Attribute } from './entities/attributes.entity';
import { ProductAttributes } from './entities/product-attributes.entity';
import { ProductInventory } from './entities/product-inventory.entity';
import { Order } from './entities/order.entity';


const MODELS = [
    User,
    Product,
    Payment,
    Address,
    Attribute,
    ProductAttributes,
    ProductInventory,
    Order,
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
                host: 'order-processing-db-dev.mysql.database.azure.com',
                port: 3306,
                username: 'admindev',
                password: 'root@123',
                database: 'order_processing_dev',
                logging: false,
                
            });
            sequelize.addModels([...MODELS]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
