import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  Unique,
} from "sequelize-typescript";
import { ICountry_Tax } from "../config/interfaces/models_Interfaces";

@Table({
  timestamps: false,
  tableName: "country_tax",
  modelName: "country_tax",
})
class Country_Tax extends Model<ICountry_Tax> implements ICountry_Tax {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare country_tax_id?: number;

  @Index({
    name: "country-tax-index",
    type: "FULLTEXT",
  })
  @Unique(true)
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare country: string;

  @AllowNull(true)
  @Column({
    type: DataType.FLOAT,
  })
  declare tax: number;
}

export default Country_Tax;
