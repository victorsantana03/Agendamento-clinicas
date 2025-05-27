import mongoose from "mongoose";
import "dotenv/config";

const { CONNECT_DB } = process.env;

export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Já conectado ao banco!");
    return;
  }
  try {
    await mongoose.connect(CONNECT_DB);
    console.log("Conectado ao banco");
  } catch (error) {
    console.error("Falha ao conectar ao banco", error);
  }
};
