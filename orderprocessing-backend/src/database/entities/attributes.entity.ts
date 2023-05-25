import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { tableNameConstants } from "../../assets/constants";


@Table({
    freezeTableName: true,
    timestamps: false,
    tableName: tableNameConstants.ATTRIBUTE,
})
export class Attribute extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type: DataType.STRING(36),
        defaultValue: UUIDV4,
    })
    id: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
    })
    name: string;
}
