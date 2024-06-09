import {
  Table,
  Model,
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { ITicket, ITrip } from "../config/interfaces/models_Interfaces";
import Trip from "./Trip";
import Purchased_Tickets from "./Purchased_Tickets";

@Table({
  timestamps: false,
  tableName: "ticket",
  modelName: "ticket",
})
class Ticket extends Model<ITicket> implements ITicket {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare ticket_id?: number;

  @Column({
    type: DataType.STRING,
    values: ["normal", "vip"],
  })
  declare type: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare price: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare bus_number: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare number_of_tickets: number;

  @AllowNull(false)
  @ForeignKey(() => Trip)
  @Column({
    type: DataType.INTEGER,
  })
  declare trip_id: number;
  @BelongsTo(() => Trip, { foreignKey: "trip_id" })
  declare trip: Trip;

  @HasMany(() => Purchased_Tickets, { foreignKey: "purchased_tickets_id" })
  declare purchased_tickets: Purchased_Tickets[];
}

export default Ticket;
