import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Header = ({ user }) => {
  const { pathname } = useLocation();
  console.log(user);
  return (
    <div className="fixed w-full bg-slate-800 px-10 py-5">
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
          {pathname !== "/" && (
            <div className="text-xl text-white">
              <Link to="/">Clínicas</Link>
            </div>
          )}

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 text-lg text-gray-200">
              <FaUser />
              <p className="hidden md:block">{user.email}</p>
            </div>
            <div>
              <Link
                to="/admin"
                className={`${pathname === "/admin" ? "text-blue-500" : "text-gray-200"} cursor-pointer underline`}
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Link to="/user" className="text-gray-200">
          Logar
        </Link>
      )}
    </div>
  );
};

export default Header;
