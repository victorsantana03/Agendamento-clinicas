import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnect } from "./db/connect.js";
import clinicRoutes from "./routes/clinic/clinic.js";
import professionalRoutes from "./routes/professional/professional.js";
import userRoutes from "./routes/user/user.js";
import scheduleRoutes from "./routes/schedule/schedule.js";
const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/clinics", clinicRoutes);
app.use("/professionals", professionalRoutes);
app.use("/user", userRoutes);
app.use("/schedule", scheduleRoutes);

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Conectado na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor", error);
  }
};
startServer();
