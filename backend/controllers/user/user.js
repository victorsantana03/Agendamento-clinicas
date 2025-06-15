import { User } from "../../models/user/user.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
const { SECRET_KEY, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

//CRIAR NOVO USUÁRIO
export const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.json("Preencha todos os campos!");
    return;
  }

  const userExist = await User.find({ email: email });
  if (userExist.legnt > 0) {
    res.json({ message: "Usário já cadastrado!" });
    return;
  }

  try {
    const newUser = await User.create({
      name,
      email,
    });
    res.json({
      message: "Usuário criado com sucesso!",
      user: newUser,
    });
  } catch (error) {
    console.error("erro ao criar usuário", error);
  }
};

//LISTAR USUÁRIO
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Erro ao listar usuários", error);
  }
};

//ACESSAR COMO ADMIN
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "1d" });
    return res.json({ message: "Acesso liberado!", token });
  }

  res.status(401).json({ message: "Credenciais inválidas" });
};
