import { Op } from "sequelize";
import sequelizeConnection from "../config/connections/sequelizeConnection";
import {
  ICountry_Tax,
  IPurchased_Tickets,
  ITicket,
} from "../config/interfaces/models_Interfaces";
import Purchased_Tickets from "../models/Purchased_Tickets";
import Ticket from "../models/Ticket";
import CTax from "./tax";
import CTicket from "./ticket";

export default class CProcurement {
  private static instance: CProcurement;

  private constructor() {}

  public static getInstance(): CProcurement {
    if (CProcurement.instance) {
      return CProcurement.instance;
    }
    CProcurement.instance = new CProcurement();
    return CProcurement.instance;
  }
  async sell_ticket(
    ticket_id: number,
    number_of_tickets: number,
    country: string
  ): Promise<IPurchased_Tickets> {
    const trans = await sequelizeConnection.sequelize.transaction();
    try {
      const taxInstance = CTax.getInstance();
      const ticketInstance = CTicket.getInstance();
      const ticketInfo = await ticketInstance.getTicketInfo({ ticket_id });

      if (ticketInfo && ticketInfo[0]?.number_of_tickets >= number_of_tickets) {
        const tax_value = await taxInstance.getTotalTaxForTickets(
          country,
          ticketInfo[0]?.price,
          number_of_tickets
        );
        const total_price = ticketInfo[0]?.price + tax_value;
        const info = await Purchased_Tickets.create(
          {
            country,
            number_of_tickets,
            ticket_id,
            ticket_price: ticketInfo[0]?.price,
            tax: tax_value,
          },
          { transaction: trans }
        );
        await Ticket.decrement("number_of_tickets", {
          by: number_of_tickets,
          where: { ticket_id },
          transaction: trans,
        });
        await trans.commit();
        const returnedData = info.toJSON();
        returnedData.total_price = total_price;
        return returnedData;
      } else {
        await trans.rollback();
        throw new Error(
          "The number of tickets or the wanted tickets is not available",
          { cause: "not-available" }
        );
      }
    } catch (e: any) {
      if (e instanceof Error) {
        throw new Error(e.message, { cause: e.cause });
      } else {
        throw new Error(e);
      }
    }
  }
}
