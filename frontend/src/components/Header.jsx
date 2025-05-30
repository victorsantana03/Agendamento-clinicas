import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  return (
    <div>
      {user ? (
        <div>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <div>
            <h3>Meus agendamentos</h3>
          </div>
        </div>
      ) : (
        <Link to="/user">Logar</Link>
      )}
    </div>
  );
};

export default Header;
