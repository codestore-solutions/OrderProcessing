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
        type: DataType.UUID,
        defaultValue: UUIDV4,
    })
    id: string;


    @AllowNull(false)
    @Column({
        type: DataType.ENUM,
        values: Object.values(orderStatus),
        allowNull: false,
    })
    event_type: string;


    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
    })
    order_id: string;


    @AllowNull(false)
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    timestamp: Date;
}
