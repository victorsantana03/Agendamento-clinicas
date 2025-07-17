import { User } from "../../models/user/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
const { SECRET_KEY, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

const bcryptSalt = bcrypt.genSaltSync();

//REGISTRAR USUÁRIO
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json("Preencha todos os campos!");
    return;
  }

  const existingUser = await User.find({ email });
  if (existingUser.length > 0) {
    res.status(400).json("Usuário já cadastrado com esse email!");
    return;
  }

  const encryptedPassword = bcrypt.hashSync(password, bcryptSalt);

  try {
    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    const { _id } = newUser;
    const newUserObj = { name, email, _id };
    try {
      const token = jwt.sign(newUserObj, SECRET_KEY, { expiresIn: "1d" });
      res.cookie("token", token).json(newUserObj);
    } catch (error) {
      res.status(500).json("Erro ao assinar com o JWT", error);
    }
  } catch (error) {
    console.error("erro ao criar usuário", error);
  }
};

//LOGIN DE USUÁRIO
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json("Preencha todos os campos!");
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordCorrect = bcrypt.compareSync(password, user.password);
      const { name, _id } = user;

      if (passwordCorrect) {
        const userObj = { name, email, _id };
        try {
          const token = jwt.sign(userObj, SECRET_KEY, { expiresIn: "1d" });
          res.cookie("token", token).json(userObj);
        } catch (error) {
          res.status(500).json("Erro ao assinar com o JWT", error);
        }
      } else {
        res.status(400).json("Senha inválida");
      }
    } else {
      res.status(400).json("Usuário não encontrado");
    }
  } catch (error) {
    console.error(error);
  }
};

//BUSCAR USUÁRIO
export const getUser = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Token não encontrado." });
  }
  try {
    const userJWT = jwt.verify(token, SECRET_KEY, {});
    res.json(userJWT);
  } catch (error) {
    console.error("Erro ao verificar token com JWT:", error);
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
