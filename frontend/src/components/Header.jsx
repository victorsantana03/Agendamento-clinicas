import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Header = ({ user }) => {
  const { pathname } = useLocation();
  console.log(user);
  return (
    <div className="bg-slate-800 px-10 py-5">
      {user ? (
        <div className="flex items-center justify-between">
          <div className="text-xl text-gray-200 underline">
            <Link
              to={`/agendas/${user._id}`}
              className={`${pathname === `/agendas/${user._id}` ? "text-blue-500" : ""}`}
            >
              Meus agendamentos
            </Link>
          </div>

          <div className="flex items-center gap-2 text-lg text-gray-200">
            <FaUser />
            <p>{user.email}</p>
          </div>
        </div>
      ) : (
        <Link to="/user">Logar</Link>
      )}
    </div>
  );
};

export default Header;
