import AdminPostsClinic from "./AdminPostsClinic";

const AdminPosts = () => {
  return (
    <div className="flex h-screen items-center justify-center gap-20 text-gray-200">
      <AdminPostsClinic />
      <div className="w-[400px]">
        <h1 className="pb-8 text-2xl font-bold">
          Cadastrar novo profissional:
        </h1>
        <div className="flex w-[450px] flex-col gap-10 rounded-3xl border border-gray-500 p-5">
          <div className="flex flex-col">
            <label className="text-xl">Nome:</label>
            <input
              type="text"
              placeholder="Digite o nome do profissional"
              className="w-full rounded-3xl border p-2 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl">Especialidade:</label>
            <input
              type="text"
              placeholder="Digite a especialidade do profissional"
              className="w-full rounded-3xl border p-2 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl">ID da clínica:</label>
            <input
              type="text"
              placeholder="Digite o ID da clínica referente ao profissional"
              className="w-full rounded-3xl border p-2 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl">Horários disponíveis:</label>
            <input
              type="text"
              placeholder="Digite os horários do profissional"
              className="w-full rounded-3xl border p-2 outline-none"
            />
          </div>
          <div className="text-center">
            <button className="cursor-pointer rounded-lg bg-gray-600 px-4 py-2 text-gray-200">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;
