import { Express, Router, Request, Response } from "express";
import CTax from "../controllers/tax";
import validation from "../middleware/validation";
const router = Router();

// get all tax information
router.get("/get_all_tax_info", async (req: Request, res: Response) => {
  try {
    const instance = CTax.getInstance();
    const data = await instance.getAllTaxInfo();
    res.status(200).setHeader('Content-Type', 'application/json').send({ tax_info: data });
  } catch (error) {
    res.status(500).end();
  }
});

//get tax value by country
router.get(
  "/get_tax_value",
  validation.validateGetTaxValue,
  async (req: Request, res: Response) => {
    try {
      const instance = CTax.getInstance();
      const data = await instance.getTaxValue(req.query.country.toString());
      res.status(200).setHeader('Content-Type', 'application/json').send({ tax_value: data });
    } catch (error) {
      res.status(500).end();
    }
  }
);

//get tax value by country and for tickets
router.get(
  "/calculate-tax",
  validation.validateCalculateTax,
  async (req: Request, res: Response) => {
    try {
      const instance = CTax.getInstance();
      const data = await instance.getTotalTaxForTickets(
        req.query.country.toString(),
        Number(req.query.price_of_tickets),
        Number(req.query.number_of_tickets)
      );
      res.status(200).setHeader('Content-Type', 'application/json').send({ tax_value: data });
    } catch (error) {
      res.status(500).end();
    }
  }
);

export default router;
