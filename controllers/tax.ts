import { ICountry_Tax } from "../config/interfaces/models_Interfaces";
import Country_Tax from "../models/Country_Tax";
import { appCache, getCacheValue } from "../config/cache/cache";

export default class CTax {
  private static instance: CTax;

  private constructor() {}

  public static getInstance(): CTax {
    if (CTax.instance) {
      return CTax.instance;
    }
    CTax.instance = new CTax();
    return CTax.instance;
  }

  async getTaxInfoFromDB(country: string): Promise<ICountry_Tax> {
    try {
      const info = await Country_Tax.findOne({
        where: { country: country },
      });

      return info?.toJSON();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async getTaxInfo(country: string): Promise<ICountry_Tax> {
    try {
      let taxInfo: { [key: string]: ICountry_Tax } =
        (getCacheValue("taxInfo") as { [key: string]: ICountry_Tax }) || {};

      if (!taxInfo[country]) {
        const info = await this.getTaxInfoFromDB(country);
        taxInfo[country] = info;
        appCache.set("taxInfo", taxInfo);
      }

      return taxInfo[country];
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async getAllTaxInfoFromDB(): Promise<ICountry_Tax[]> {
    try {
      const info = await Country_Tax.findAll({});

      return info;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async getAllTaxInfo(): Promise<ICountry_Tax[]> {
    try {
      let taxInfo: ICountry_Tax[] = (getCacheValue("AllTaxInfo") as []) || [];
      if (taxInfo.length==0) {
        const info = await this.getAllTaxInfoFromDB();
        taxInfo = info;
        appCache.set("AllTaxInfo", taxInfo);
      }

      return taxInfo;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  async getTaxValue(country: string): Promise<number> {
    try {
      const info = await this.getTaxInfo(country);
      const taxValue = info?.tax;
      return taxValue ? taxValue : 0;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  calculateTax(
    priceOfTicket: number,
    numberOfTickets: number,
    tax: number
  ): number {
    return (priceOfTicket * numberOfTickets * tax) / 100;
  }

  async getTotalTaxForTickets(
    country: string,
    priceOfTicket: number,
    numberOfTickets: number
  ): Promise<number> {
    try {
      const taxValue = await this.getTaxValue(country);
      const calculatedTaxValue = this.calculateTax(
        priceOfTicket,
        numberOfTickets,
        taxValue
      );
      return calculatedTaxValue;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async addTax(country: string, tax: number): Promise<ICountry_Tax> {
    try {
      const info = await Country_Tax.create({ country: country, tax: tax });
      appCache.del("AllTaxInfo");
      return info;
    } catch (e: any) {
      if (e.errors[0].type == "unique violation") {
        throw new Error(e.errors[0].message, { cause: e.errors[0].type });
      } else throw new Error(e.message);
    }
  }

  async editTax(country: string, tax: number): Promise<ICountry_Tax> {
    try {
      let taxInfo: { [key: string]: ICountry_Tax } =
        (getCacheValue("taxInfo") as { [key: string]: ICountry_Tax }) || {};

  

      const updateInfo = await Country_Tax.update(
        { tax: tax },
        { where: { country: country } }
      );
      const info = await this.getTaxInfo(country);
      if (taxInfo[country]) {
        taxInfo[country].tax = tax;
        appCache.set("taxInfo", taxInfo);
      }
      return info;
    } catch (e: any) {
      if (e.errors[0].type == "unique violation") {
        throw new Error(e.errors[0].message, { cause: e.errors[0].type });
      } else throw new Error(e.message);
    }
  }
}
