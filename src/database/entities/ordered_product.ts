import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
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
        type: DataType.STRING(36),
        defaultValue: UUIDV4,
    })
    id: string;

    
    @ForeignKey(() => Order)
    @Column({
        type: DataType.STRING(36),
    })
    orderId: string;


    @BelongsTo(() => Order)
    order: Order;


    @Column({
        type: DataType.STRING(36),
    })
    variantId: string;

    
    @Column({
        type: DataType.STRING(36),
    })
    productId: string;


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
