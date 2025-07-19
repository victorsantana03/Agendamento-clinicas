import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useUserStore } from "../store/user.js";

const Header = () => {
  const { pathname } = useLocation();

  const { user } = useUserStore();

  return (
    <div className="fixed w-full bg-slate-800 px-5 py-5 md:px-10">
      {user ? (
        <div className="flex items-center justify-between">
          <div className="text-gray-200 underline lg:text-xl">
            <Link
              to={`/agendas/${user._id}`}
              className={`${pathname === `/agendas/${user._id}` ? "text-blue-500" : ""}`}
            >
              Meus agendamentos
            </Link>
          </div>
          {pathname !== "/" && (
            <div className="text-white lg:text-xl">
              <Link to="/">Clínicas</Link>
            </div>
          )}

          <div className="flex items-center gap-10">
            <div className="hidden items-center gap-2 text-lg text-gray-200 sm:flex">
              <FaUser className="text-lg" />
              <p className="text-sm md:text-lg">{user.email}</p>
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
        <div className="flex justify-between">
          <Link to="/user" className="text-gray-200">
            Logar
          </Link>
          <Link
            to="/admin"
            className={`${pathname === "/admin" ? "text-blue-500" : "text-gray-200"} cursor-pointer underline`}
          >
            Admin
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
