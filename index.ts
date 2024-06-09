import express from "express";
import cors from "cors";
import "./config/connections/sequelizeConnection"

import taxRouter from "./services/tax"
import adminRouter from "./services/admin";
import procurementRouter from "./services/procurement";
import userRouter from "./services/auth";
import tripRouter from "./services/trip";
import ticketRouter from "./services/ticket";
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({"origin": "*",
credentials: true,

}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.use('/tax',taxRouter);
app.use('/admin',adminRouter);
app.use('/purchase',procurementRouter)
app.use('/auth',userRouter)
app.use('/trip',tripRouter)
app.use('/ticket',ticketRouter)



app.use(async (req:any, res:any, next:any)=>{ 
  res.status(404).send({message:"Not Found"});
});

app.listen(port, () => {
  console.log("Express app is listening on the port 3000!");
});
