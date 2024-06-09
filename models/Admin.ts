import {
  Sequelize,
  DataType,
  Model,
  Table,
  Column,
  PrimaryKey,
  ForeignKey,
  AllowNull,
  BelongsTo,
  IsEmail,
  Length,
  Unique,
  BeforeCreate,
  AutoIncrement,
} from "sequelize-typescript";
import User from "./Admin";
import bcrypt from "bcrypt";
import { IUser } from "../config/interfaces/models_Interfaces";

@Table({
  timestamps: false,
  tableName: "admin",
  modelName: "Admin",
})
class Admin extends Model<IUser> implements IUser {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare uid?: number;

  @AllowNull(false)
  @Length({ min: 3, max: 10 })
  @Column({
    type: DataType.STRING(10),
  })
  declare first_name: string;

  @AllowNull(false)
  @Length({ min: 3, max: 10 })
  @Column({
    type: DataType.STRING(10),
  })
  declare last_name: string;

  @Unique(true)
  @IsEmail
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(1000),
  })
  declare password?: string;

  @BeforeCreate
  static passwordEncryption(instance: User) {
    try {
      const salt = bcrypt.genSaltSync(10);
      instance.password = bcrypt.hashSync(instance.password, salt);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}

export default Admin;
