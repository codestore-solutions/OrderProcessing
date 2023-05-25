import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { tableNameConstants } from "../../assets/constants";
import { User } from "./user.entity";


@Table({
    freezeTableName: true,
    timestamps: false,
    tableName: tableNameConstants.PRODUCT,
})
export class Product extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
        defaultValue: UUIDV4,
    }) 
    id: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
    })
    storeId: string;

    @BelongsTo(() => User)
    store: User;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(100),
    })
    name: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(500),
    })
    description: string;

    @AllowNull(false)
    @Column({
        type: DataType.FLOAT,
    })
    price: number;

    @AllowNull(false)
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;
}
