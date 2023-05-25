import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { tableNameConstants } from "../../assets/constants";
import { Product } from "./product.entity";
import { Attribute } from "./attributes.entity";


@Table({
    freezeTableName: true,
    timestamps: false,
    tableName: tableNameConstants.PRODUCT_ATTIBUTES
})
export class ProductAttributes extends Model {
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
  
    @ForeignKey(() => Attribute)
    @Column
    attributeId: string;
  
    @BelongsTo(() => Attribute)
    attribute: Attribute;
  
    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
    })
    value: string;

    @AllowNull(false)
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;
}
