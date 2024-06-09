import { appCache, getCacheValue } from "../config/cache/cache";
import { ITrip } from "../config/interfaces/models_Interfaces";
import Trip from "../models/Trip";

export default class CTrip {
  private static instance: CTrip;

  private constructor() {}

  public static getInstance(): CTrip {
    if (CTrip.instance) {
      return CTrip.instance;
    }
    CTrip.instance = new CTrip();
    return CTrip.instance;
  }

  async addTrip(
    date: string,
    time: string,
    from_city: string,
    to_city: string
  ) {
    try {
      const info = await Trip.create({
        date: date,
        time: time,
        from_city: from_city,
        to_city: to_city,
      });
      appCache.del("AllTripsInfo")

      return info.toJSON();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async getTripInfo(condition: Partial<ITrip>): Promise<ITrip[]> {
    try {
      const info = await Trip.findAll({ where: condition });
      return info;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }


  async getTripInfoByIDFromDB(id: number): Promise<ITrip> {
    try {
      const info = await Trip.findByPk(id);
      return info?.toJSON();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }



  async getTripInfoByID(id: number): Promise<ITrip> {
    try {
      let tripInfo: { [key: number]: ITrip } =
        (getCacheValue("tripInfo") as { [key: number]: ITrip }) || {};

      if (!tripInfo[id]) {
        const info = await this.getTripInfoByIDFromDB(id);
        tripInfo[id] = info;
        appCache.set("tripInfo", tripInfo);
      }

      return tripInfo[id];
    } catch (e: any) {
      throw new Error(e.message);
    }
  }


  async getAllTrips(): Promise<ITrip[]> {
    try {
      const info = await Trip.findAll();
      return info;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }



  async getAllTripsInfo(): Promise<ITrip[]> {
    try {
      let tripsInfo: ITrip[] = (getCacheValue("AllTripsInfo") as []) || [];

      if (tripsInfo.length==0) {
        const info = await this.getAllTrips();
        tripsInfo = info;
        appCache.set("AllTripsInfo", tripsInfo);
      }

      return tripsInfo;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
