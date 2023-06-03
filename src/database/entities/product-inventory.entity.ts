import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { tableNameConstants } from "../../assets/constants";
import { Product } from "./product.entity";


@Table({
    freezeTableName: true,
    timestamps: false,
    tableName: tableNameConstants.PRODUCT_INVENTORY
})
export class ProductInventory extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
        defaultValue: UUIDV4,
    })
    id: string;

    @ForeignKey(() => Product)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
    })
    productId: string;

    @BelongsTo(() => Product)
    product: Product;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
    })
    quantity: number;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    quantitySold: number;

    @AllowNull(false)
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    canCancel: boolean;
    
    @AllowNull(false)
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    canExchange: boolean;

    @AllowNull(false)
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    canReturn: boolean;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    daysToTakeAction: number;

    @AllowNull(false)
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;
}

