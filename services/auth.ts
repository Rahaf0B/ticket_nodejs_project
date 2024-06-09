import { Express, Router, Request, Response } from "express";
import validation from "../middleware/validation";
import CUser from "../controllers/user";
const router = Router();

router.post(
  "/register",
  validation.validateRegisterUserAccount,
  async (req: Request, res: Response) => {
    try {
      const instance = CUser.getInstance();
      const [token, userData] = await instance.registerUser(
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.password
      );
      res.status(201).setHeader('Content-Type', 'application/json').setHeader("Authorization", token).send(userData);
    } catch (error: any) {
      if (error.cause == "unique violation") {
        res.status(409).send("Duplicate Email");
      } else {
        res.status(500).send();
      }
    }
  }
);

router.post(
  "/login",
  validation.validateLoginUserAccount,
  async (req: Request, res: Response) => {
    try {
      const instance = CUser.getInstance();

      const [token, userData] = await instance.userLogin(req.body.email,req.body.password);
      res
        .status(201)
        .setHeader("Authorization", token)
        .setHeader("Content-Type", "application/json; charset=utf-8")
        .send(userData);
    } catch (error: any) {
      if (error.cause == "not-found" || error.cause == "Validation Error") {
        res.status(406).send("The email or password is incorrect");
      } else res.status(500).send();
    }
  }
);

export default router;
