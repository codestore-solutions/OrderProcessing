import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { persona, tableNameConstants } from "../../assets/constants";

@Table({
    freezeTableName: true,
    timestamps: false,
    tableName: tableNameConstants.USER,
})
export class User extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
        defaultValue: UUIDV4,
    })
    id: string;

    @Column({
        type: DataType.STRING(500)
    })
    username: string;

    @Column({
        type: DataType.ENUM,
        values: persona,
        allowNull: false,
    })
    persona: string
}