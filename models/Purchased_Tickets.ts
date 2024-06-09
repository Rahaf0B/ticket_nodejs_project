import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Index,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import {
  IPurchased_Tickets,
  ITicket,
  ITime,
} from "../config/interfaces/models_Interfaces";
import Ticket from "./Ticket";
import { NOW } from "sequelize";

@Table({
  timestamps: false,
  tableName: "purchased_tickets",
  modelName: "purchased_tickets",
})
class Purchased_Tickets
  extends Model<IPurchased_Tickets>
  implements IPurchased_Tickets
{
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare purchased_tickets_id?: number;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue:NOW
  })
  declare date: Date;

  @AllowNull(false)
  @Column({
    type: DataType.TIME,
    defaultValue:NOW

  })
  declare time: ITime;

  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.INTEGER,
  })
  declare ticket_id: number;

  @BelongsTo(() => Ticket, {
    foreignKey: "ticket_id",
  })
  declare ticket: Ticket;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare number_of_tickets: number;


  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare ticket_price: number;


  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare tax: number;

  @Index({
    name: "country-index",
    type: "FULLTEXT",
  })
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare country: string;
}

export default Purchased_Tickets;
