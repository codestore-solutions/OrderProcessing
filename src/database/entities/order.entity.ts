import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { PaymentMode, orderStatus, tableNameConstants } from '../../assets/constants'
import { Product } from "src/database/entities/product.entity";
import { User } from "src/database/entities/user.entity";
import { Address } from "src/database/entities/address.entity";
import { Payment } from "src/database/entities/payment.entity";
import { ProductAttributes } from "src/database/entities/product-attributes.entity";


@Table({
    freezeTableName: true,
    timestamps: false,
    tableName: tableNameConstants.ORDER,
})
export class Order extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataType.NUMBER
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.NUMBER
    })
    userId: number;

    @BelongsTo(() => User, 'userId')
    customer: User;

    @ForeignKey(() => User)
    @Column({
        type: DataType.NUMBER
    })
    storeId: number;

    @BelongsTo(() => User, 'storeId')
    store: User;

    @ForeignKey(() => ProductAttributes)
    @Column({
        type: DataType.STRING(36)
    })
    productAttributeId: string;

    @BelongsTo(() => ProductAttributes)
    productAttributes: ProductAttributes;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.STRING(36)
    })
    productId: string;

    @Column({
        type: DataType.STRING(36)
    })
    cartId: string;

    @BelongsTo(() => Product)
    product: Product;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.NUMBER
    })
    shippingAddressId: number;
    
    @BelongsTo(() => Address)
    address: Address;

    @ForeignKey(() => Payment)
    @Column({
        type: DataType.STRING(36)
    })
    paymentId: string;

    @BelongsTo(() => Payment)
    payment: Payment;

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


    @Column({
        type: DataType.ENUM,
        values: orderStatus,
        allowNull: false,
        defaultValue: 'pending'
    })
    status: string

    @Column({
        type: DataType.ENUM,
        values: Object.values(PaymentMode),
        allowNull: false,
    })
    paymentMode: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt: string;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
    })
    quantity: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.NUMBER
    })
    deliveryAgentId: number;

    @BelongsTo(() => User, 'deliveryAgentId')
    deliveryAgent: User;
}