import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { tableNameConstants } from "../../assets/constants";
import { User } from "./user.entity";


@Table({
    freezeTableName: true,
    timestamps: false,
    tableName: tableNameConstants.PAYMENT,
})
export class Payment extends Model {
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
    customerId: string;

    @BelongsTo(() => User)
    customer: User;

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
        type: DataType.FLOAT,
    })
    amountPaid: number;

    @AllowNull(false)
    @Column({
        type: DataType.FLOAT,
    })
    discount: number;

    @AllowNull(false)
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;
}
