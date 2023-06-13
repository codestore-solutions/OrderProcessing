import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { PaymentMode, deliveryModes, orderStatus, paymentStatus, roles, tableNameConstants } from '../../assets/constants'


@Table({
    freezeTableName: true,
    timestamps: false,
    tableName: tableNameConstants.ORDER,
})
export class Order extends Model {

    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
        defaultValue: UUIDV4,
    })
    id: string;


    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
    })
    orderInstanceId: string;


    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
    })
    product_count: number;


    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
    })
    customerId: string;

    
    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
    })
    storeId: string;


    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
    })
    shippingAddressId: string;


    @AllowNull(true)
    @Column({
        type: DataType.STRING(36)
    })
    paymentId: string;


    @AllowNull(false)
    @Column({
        type: DataType.ENUM,
        values: paymentStatus,
        allowNull: false,
        defaultValue: 'pending'
    })
    paymentStatus: string

    @Column({
        type: DataType.ENUM,
        values: Object.values(PaymentMode),
        allowNull: false,
    })
    paymentMode: string;


    @Column({
        type: DataType.ENUM,
        values: orderStatus,
        allowNull: false,
        defaultValue: 'pending'
    })
    orderStatus: string


    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: string;


    @AllowNull(true)
    @Column({
        type: DataType.ENUM,
        values: roles,
        allowNull: false,
    })
    createdBy: string;


    @AllowNull(true)
    @Column({
        type: DataType.DATE,
    })
    updatedAt: string;


    @AllowNull(true)
    @Column({
        type: DataType.STRING(36),
    })
    deliveryId: string;


    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    deliveryCharge: number;


    // @AllowNull(true)
    // @Column({
    //     type: DataType.INTEGER,
    //     defaultValue: 0,
    // })
    // deliveryEstimatedTime: number

    @AllowNull(true)
    @Column({
        type: DataType.ENUM,
        values: deliveryModes,
        allowNull: true,
    })
    deliveryMode: string;
}