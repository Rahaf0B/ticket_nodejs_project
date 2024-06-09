import { Express, Router, Request, Response } from "express";
import CTax from "../controllers/tax";
import validation from "../middleware/validation";
import CTrip from "../controllers/trip";
const router = Router();

// get all trips information
router.get("/get_all_trip_info", async (req: Request, res: Response) => {
  try {
    const instance = CTrip.getInstance();
    const data = await instance.getAllTripsInfo();
    res.status(200).send({ trip_info: data });
  } catch (error) {
    res.status(500).end();
  }
});

router.get(
  "/get_Filter_trip_info",
  validation.validateGetTrip,
  async (req: Request, res: Response) => {
    try {
      const instance = CTrip.getInstance();
      const data = await instance.getTripInfo(req.body);
      res.status(200).send({  trip_info: data });
    } catch (error) {
      res.status(500).end();
    }
  }
);

  router.get(
    "/get_by_id_trip_info/:trip_id",
    validation.validateSingleTripInfo,
    async (req: Request, res: Response) => {
      try {
        const instance = CTrip.getInstance();
        const data = await instance.getTripInfoByID(Number(req.params.trip_id));
        res.status(200).send(data);
      } catch (error) {
        res.status(500).end();
      }
    }
);

export default router;
