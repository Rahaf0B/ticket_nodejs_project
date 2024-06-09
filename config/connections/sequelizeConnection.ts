import { Sequelize } from "sequelize-typescript";
import Country_Tax from "../../models/Country_Tax";
import Purchased_Tickets from "../../models/Purchased_Tickets";
import Ticket from "../../models/Ticket";
import Trip from "../../models/Trip";
import Admin from "../../models/Admin";

import dotenv from 'dotenv'
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB,

  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.Host,
  port: 3306,
  dialect: "mysql",
});

sequelize.addModels([Trip,Ticket,Purchased_Tickets,Country_Tax,Admin]);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    sequelize.sync();//{ alter: true , force: false }
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default {sequelize};