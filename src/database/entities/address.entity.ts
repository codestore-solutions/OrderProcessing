import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { tableNameConstants } from "../../assets/constants";
import { User } from "./user.entity";

@Table({
    freezeTableName: true,
    timestamps: false,
    tableName: tableNameConstants.ADDRESS,
})
export class Address extends Model {
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
    userId: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(100),
    })
    street: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
    })
    city: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(20),
    })
    postalCode: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
    })
    state: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
    })
    country: string;
}
