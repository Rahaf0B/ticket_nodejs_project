import {
  Table,
  Model,
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import { ITrip, ITime } from "../config/interfaces/models_Interfaces";
import Ticket from "./Ticket";

@Table({
  timestamps: false,
  tableName: "trip",
  modelName: "trip",
})
class Trip extends Model<ITrip> implements ITrip {
 
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare trip_id?: number;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY,
  })
  declare date: string;

  @AllowNull(false)
  @Column({
    type: DataType.TIME,
  })
  declare time: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare from_city: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare to_city: string;

  @HasMany(() => Ticket, { foreignKey: "trip_id" })
  declare tickets?: Ticket[];
}

export default Trip;
