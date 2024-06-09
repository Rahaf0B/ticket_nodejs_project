import { Express, Router, Request, Response } from "express";
import CTax from "../controllers/tax";
import CTicket from "../controllers/ticket";
import CTrip from "../controllers/trip";
import authorization from "../middleware/authorization";
import validation from "../middleware/validation";
const router = Router();


router.post(
  "/add-ticket",
  authorization.checkUserAuthorization,
  validation.validateAddTicket,
  async (req: Request, res: Response) => {
    try {
      const instance = CTicket.getInstance();
      const data = await instance.addTicket(
        req.body.type,
        Number(req.body.price),
        Number(req.body.bus_number),
        Number(req.body.trip_id),
        Number(req.body.number_of_tickets)
      );
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    } catch (error: any) {
      if (error.cause == "not-found") {
        res.status(404).send(error.message);
      } else res.status(500).end();
    }
  }
);

router.post(
  "/add-trip",
  authorization.checkUserAuthorization,
  validation.validateAddTrip,
  async (req: Request, res: Response) => {
    try {
      const instance = CTrip.getInstance();
      const data = await instance.addTrip(
        req.body.date,
        req.body.time,
        req.body.from_city,
        req.body.to_city
      );
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    } catch (error) {
      res.status(500).end();
    }
  }
);

router.post(
  "/add-tax",
  authorization.checkUserAuthorization,
  validation.validateBodyTax,
  async (req: Request, res: Response) => {
    try {
      const instance = CTax.getInstance();
      const data = await instance.addTax(
        req.body.country,
        Number(req.body.tax)
      );
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    } catch (error: any) {
      if ((error.cause = "unique violation")) {
        res.status(400).send(error.message);
      } else res.status(500).end();
    }
  }
);

router.post(
  "/edit-tax",
  authorization.checkUserAuthorization,
  validation.validateBodyTax,
  async (req: Request, res: Response) => {
    try {
      const instance = CTax.getInstance();
      const data = await instance.editTax(
        req.body.country,
        Number(req.body.tax)
      );
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    } catch (error: any) {
      res.status(500).end();
    }
  }
);

export default router;
