import { AllowNull, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { orderStatus, tableNameConstants } from "../../assets/constants";
import { User } from "./user.entity";


@Table({
    freezeTableName: true,
    timestamps: false,
    tableName: tableNameConstants.ORDER_STATUS
})
export class OrderStatusEntity extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;


    @AllowNull(false)
    @Column({
        type: DataType.ENUM,
        values: orderStatus,
        allowNull: false,
        defaultValue: 'pending'
    })
    event_type: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
    })
    order_id: number;


    @AllowNull(false)
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    timestamp: Date;
}
