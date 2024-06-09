import { object, string, number, date, mixed, lazy, array, bool } from "yup";
import { Request, Response, NextFunction, query } from "express";

async function validateRegisterUserAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let schema = object({
    body: object({
      first_name: string()
        .strict(true)
        .typeError("The first_name Should be String")
        .nullable()
        .required("The first_name is required")
        .min(3, "The first_name length must be greater than 3 characters")
        .max(10, "The first_name length must be less than 10 characters"),

      last_name: string()
        .strict(true)
        .typeError("The last_name Should be String")
        .nullable()
        .required("The last_name is required")
        .min(3, "The last_name length must be greater than 3 characters")
        .max(10, "The last_name length must be less than 10 characters"),

      email: string()
        .strict(true)
        .typeError("The Email Should be String")
        .required("The email is required")
        .email("It should be in the Email form")
        .nullable(),

      password: string()
        .strict(true)
        .required("The password is required")
        .typeError("The password Should be String")
        .min(8, "password should not be less than 8 digits")
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
          "The password must numbers and special characters"
        )
        .nullable(),
    })
      .required("The first_name, last_name,email,password are required")
      .nullable()
      .strict(true)
      .noUnknown(true),
  });

  try {
    const response = await schema.validate({ body: req.body });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateLoginUserAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let schema = object({
    body: object({
      email: string()
        .strict(true)
        .typeError("The Email Should be String")
        .required("The email is required")
        .email("It should be in the Email form")
        .nullable(),

      password: string()
        .strict(true)
        .required("The password is required")
        .typeError("The password Should be String")
        .nullable(),
    })
      .required("The email and password are required")
      .nullable()
      .strict(true)
      .noUnknown(true),
  });

  try {
    const response = await schema.validate({ body: req.body });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateBodyTax(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let schema = object({
    body: object({
      country: string()
        .strict(true)
        .typeError("The country Should be String")
        .nullable()
        .required("The country is required"),

      tax: number()
        .strict(true)
        .typeError("The tax Should be number")
        .nullable()
        .required("The tax is required"),
    })
      .required("The tax and the country are required")
      .nullable()
      .strict(true)
      .noUnknown(true),
  });

  try {
    const response = await schema.validate({ body: req.body });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateAddTrip(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let schema = object({
    body: object({
      date: string()
        .strict(true)
        .typeError("The date Should be String")
        .nullable()
        .required("The date is required")
        .test("min", "the date is in the past", function (value) {
          if (!value) return true;
          const [year, month, day] = value.split("-").map(Number);
          const inputDate = new Date(year, month - 1, day);
          return inputDate < new Date();
        })
        .matches(
          /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/,
          "date must be in format yyyy-MM-dd"
        ),
      time: string()
        .strict(true)
        .typeError("The time Should be String")
        .nullable()
        .required("The time is required"),
      from_city: string()
        .strict(true)
        .typeError("The from_city Should be String")
        .nullable()
        .required("The from_city is required"),
      to_city: string()
        .strict(true)
        .typeError("The to_city Should be String")
        .nullable()
        .required("The to_city is required"),
    })
      .required("The date, time, from_city, to_city are required")
      .nullable()
      .strict(true)
      .noUnknown(true),
  });

  try {
    const response = await schema.validate({ body: req.body });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateGetTrip(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let schema = object({
    body: object({
      date: string()
        .strict(true)
        .typeError("The date Should be String")
        .nullable()
        .test("min", "the date is in the past", function (value) {
          if (!value) return true;
          const [year, month, day] = value.split("-").map(Number);
          const inputDate = new Date(year, month - 1, day);
          return inputDate < new Date();
        })
        .matches(
          /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/,
          "date must be in format yyyy-MM-dd"
        ),
      time: string()
        .strict(true)
        .typeError("The time Should be String")
        .nullable(),
      from_city: string()
        .strict(true)
        .typeError("The from_city Should be String")
        .nullable(),
      to_city: string()
        .strict(true)
        .typeError("The to_city Should be String")
        .nullable(),
      trip_id: number()
        .strict(true)
        .typeError("The trip_id Should be number")
        .nullable(),
    })
      .required(
        "The trip_id or date or time or from_city or to_city are required"
      )
      .nullable()
      .strict(true)
      .noUnknown(true),
  });

  try {
    const response = await schema.validate({ body: req.body });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateAddTicket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let schema = object({
    body: object({
      type: string()
        .strict(true)
        .typeError("The type Should be string")
        .oneOf(
          ["normal", "vip"],
          "The value of ticket type must be normal or vip"
        )
        .nullable()
        .required("The type is required"),

      number_of_tickets: number()
        .strict(true)
        .typeError("The number_of_tickets Should be number")
        .nullable()
        .required("The number_of_tickets is required"),

      trip_id: number()
        .strict(true)
        .typeError("The trip_id Should be number")
        .nullable()
        .required("The trip_id is required"),

      bus_number: number()
        .strict(true)
        .typeError("The bus_number Should be number")
        .nullable()
        .required("The bus_number is required"),

      price: number()
        .strict(true)
        .typeError("The price Should be number")
        .nullable()
        .required("The price is required"),
    })
      .required(
        "The price,bus_number,trip_id,number_of_tickets,type are required"
      )
      .nullable()
      .strict(true)
      .noUnknown(true),
  });

  try {
    const response = await schema.validate({ body: req.body });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateSingleTripInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let validateSchema = object({
    params: object({
      trip_id: number()
        .typeError("The trip_id Should be number")
        .nullable()
        .required("The trip_id is required"),
    }).noUnknown(true),
  });

  try {
    const response = await validateSchema.validate({
      params: req.params,
    });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateCalculateTax(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let validateSchema = object({
    query: object({
      country: string()
        .strict(true)
        .typeError("The country Should be String")
        .nullable()
        .required("The country is required"),

      number_of_tickets: number()
        .typeError("The number_of_tickets Should be number")
        .nullable()
        .required("The number_of_tickets is required")
        .min(1, "The value of the number_of_tickets should be 1 or more"),

      price_of_tickets: number()
        .typeError("The price_of_tickets Should be number")
        .nullable()
        .required("The price_of_tickets is required")
        .min(1, "The price_of_tickets should be 1 or more"),
    }).noUnknown(true),
  });

  try {
    const response = await validateSchema.validate({
      query: req.query,
    });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateGetTaxValue(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let validateSchema = object({
    query: object({
      country: string()
        .strict(true)
        .typeError("The country Should be String")
        .nullable()
        .required("The country is required"),
    }).noUnknown(true),
  });

  try {
    const response = await validateSchema.validate({
      query: req.query,
    });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateGetTicketInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let schema = object({
    body: object({
      type: string()
        .strict(true)
        .typeError("The type Should be string")
        .oneOf(
          ["normal", "vip"],
          "The value of ticket type must be normal or vip"
        )
        .nullable(),

      number_of_tickets: number()
        .strict(true)
        .typeError("The number_of_tickets Should be number")
        .nullable(),

      trip_id: number()
        .strict(true)
        .typeError("The trip_id Should be number")
        .nullable(),

      bus_number: number()
        .strict(true)
        .typeError("The bus_number Should be number")
        .nullable(),

      price: number()
        .strict(true)
        .typeError("The price Should be number")
        .nullable(),
    })
      .required(
        "The price,bus_number,trip_id,number_of_tickets,type are required"
      )
      .nullable()
      .strict(true)
      .noUnknown(true),
  });

  try {
    const response = await schema.validate({ body: req.body });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

async function validateSellTicket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let schema = object({
    body: object({
      number_of_tickets: number()
        .strict(true)
        .typeError("The number_of_tickets Should be number")
        .nullable()
        .required("The number_of_tickets is required"),

      ticket_id: number()
        .strict(true)
        .typeError("The ticket_idticket_id Should be number")
        .nullable()
        .required("The trip_id is required"),

      country: string()
        .strict(true)
        .typeError("The country Should be String")
        .nullable()
        .required("The country is required"),
    })
      .required("The ticket_id and number_of_tickets are required")
      .nullable()
      .strict(true)
      .noUnknown(true),
  });

  try {
    const response = await schema.validate({ body: req.body });
    next();
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

export default {
  validateRegisterUserAccount,
  validateLoginUserAccount,
  validateBodyTax,
  validateAddTrip,
  validateAddTicket,
  validateCalculateTax,
  validateGetTicketInfo,
  validateSellTicket,
  validateGetTaxValue,
  validateGetTrip,
  validateSingleTripInfo,
};
