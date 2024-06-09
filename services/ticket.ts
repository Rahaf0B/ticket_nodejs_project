import { Express, Router, Request, Response } from "express";
import CTicket from "../controllers/ticket";
import validation from "../middleware/validation";
const router = Router();

router.get("/get-all-tickets", async (req: Request, res: Response) => {
  try {
    const instance = CTicket.getInstance();
    const data = await instance.getAllTicketInfoFromDB();
    res.status(200).setHeader('Content-Type', 'application/json').send({"ticket_info":data});
  } catch (error) {
    res.status(500).end();
  }
});

router.get(
  "/get-ticket-info",
  validation.validateGetTicketInfo,
  async (req: Request, res: Response) => {
    try {
      const instance = CTicket.getInstance();
    
      const data = await instance.getTicketInfo(req.body);
      res.status(200).setHeader('Content-Type', 'application/json').send({"ticket_info":data});
    } catch (error) {
      res.status(500).end();
    }
  }
);


export default router;