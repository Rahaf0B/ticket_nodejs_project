import { appCache, getCacheValue } from "../config/cache/cache";
import { ITicket } from "../config/interfaces/models_Interfaces";
import Ticket from "../models/Ticket";
import CTrip from "./trip";
export default class CTicket {
  private static instance: CTicket;

  private constructor() {}

  public static getInstance(): CTicket {
    if (CTicket.instance) {
      return CTicket.instance;
    }
    CTicket.instance = new CTicket();
    return CTicket.instance;
  }

  async addTicket(
    type: string,
    price: number,
    bus_number: number,
    trip_id: number,
    number_of_tickets: number
  ) {
    try {
      const instance = CTrip.getInstance();
      const tripInfo = await instance.getTripInfo({
        trip_id: trip_id,
      });
      if (tripInfo) {
        const info = await Ticket.create({
          type: type,
          bus_number: bus_number,
          trip_id: trip_id,
          price: price,
          number_of_tickets: number_of_tickets,
        });
        appCache.del("AllTicketsInfo")

        return info.toJSON();
      }
      throw new Error("There is no trip with this ID", { cause: "not-found" });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async getTicketInfo(condition: Partial<ITicket>): Promise<ITicket[]> {
    try {
      const ticketInfo = await Ticket.findAll({ where: condition });
      return ticketInfo;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async getAllTicketInfoFromDB() {
    try {
      const ticketInfo = await Ticket.findAll();

      return ticketInfo;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }



  async getAllTicketsInfo(): Promise<ITicket[]> {
    try {
      let ticketsInfo: ITicket[] = (getCacheValue("AllTicketsInfo") as []) || [];

      if (ticketsInfo.length==0) {
        const info = await this.getAllTicketInfoFromDB();
        ticketsInfo = info;
        appCache.set("AllTicketsInfo", ticketsInfo);
      }

      return ticketsInfo;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async getTicketPrice(id: number): Promise<number> {
    try {
      const ticketInfo = await this.getTicketInfo({ticket_id: id});
      const price = ticketInfo[0]?.price;
      return price;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
