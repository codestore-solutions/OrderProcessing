import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { tableNameConstants } from "../../assets/constants";
import { Order } from "./order.entity";


@Table({
    freezeTableName: true,
    timestamps: false,
    tableName: tableNameConstants.ORDERED_ITEM,
})
export class OrderItem extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    
    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER
    })
    orderId: number;


    @BelongsTo(() => Order)
    order: Order;


    @Column({
        type: DataType.INTEGER
    })
    variantId: number;

    
    @Column({
        type: DataType.INTEGER,
    })
    productId: number;


    @AllowNull(false)
    @Column({
        type: DataType.FLOAT,
    })
    price: number;


    @AllowNull(false)
    @Column({
        type: DataType.FLOAT,
        defaultValue: 0,
    })
    discount: number;


    @AllowNull(false)
    @Column({
        type: DataType.FLOAT,
        defaultValue: 0,
    })
    gst: number;


    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 1,
    })
    quantity: number;
}
