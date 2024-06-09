export interface ITime {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ICountry_Tax {
  country_tax_id?: number;
  country: string;
  tax: number;
}

export interface ITrip {
  trip_id?: number;
  date: string;
  time: string;
  from_city: string;
  to_city: string;
}

export interface ITicket {
  ticket_id?: number;
  type: string;
  price: number;
  bus_number: number;
  number_of_tickets: number;
  trip_id: number;
}
export interface IPurchased_Tickets {
  purchased_tickets_id?: number;
  date: Date;
  time: ITime;
  ticket: ITicket;
  number_of_tickets: number;
  country: string;
  ticket_price: number;
  tax:number;
  ticket_id: number;
  total_price?: number;
}

export interface IUser {
  uid?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
}
