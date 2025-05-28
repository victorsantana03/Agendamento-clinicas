import { User } from "../../models/user/user.js";

//CRIAR NOVO USUÁRIO
export const createUser = async (req, res) => {
  const { name, email, cellphone, birth } = req.body;

  if (!name || !email || !cellphone || !birth) {
    res.json("Preencha todos os campos!");
    return;
  }

  const userExist = await User.find({ email: email });
  if (userExist.legnt > 0) {
    res.json("Usário já cadastrado!");
    return;
  }

  try {
    const newUser = await User.create({
      name,
      email,
      cellphone,
      birth,
    });
    res.json(newUser);
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
