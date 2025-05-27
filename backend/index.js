import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnect } from "./db/connect.js";
import clinicRoutes from "./routes/clinic/clinic.js";
import professionalRoutes from "./routes/professional/professional.js";
const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/clinics", clinicRoutes);
app.use("/professionals", professionalRoutes);

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
