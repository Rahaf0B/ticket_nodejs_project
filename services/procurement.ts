import { Express, Router, Request, Response } from "express";
import CProcurement from "../controllers/procurement";
import validation from "../middleware/validation";
const router = Router();

router.post(
  "/",
  validation.validateSellTicket,
  async (req: Request, res: Response) => {
    try {
      const instance = CProcurement.getInstance();
      const data = await instance.sell_ticket(
        Number(req.body.ticket_id),
        Number(req.body.number_of_tickets),

        req.body.country
      );
      res.status(200).setHeader('Content-Type', 'application/json').send(data);
    } catch (error:any) {
      if(error.cause=="not-available"){
        res.status(400).send(error.message);
      } else
      res.status(500).end();
    }
  }
);

export default router;
