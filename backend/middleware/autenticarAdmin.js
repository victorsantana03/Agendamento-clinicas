import jwt from "jsonwebtoken";
import "dotenv/config";
const { SECRET_KEY } = process.env;

export function autenticarAdmin(req, res, next) {
  const authHeader = req.headers.autorization;
  if (!authHeader) {
    return res.status(401).json({ erro: "Token ausente" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ erro: "Acesso restrito a administradores" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido" });
  }
}
