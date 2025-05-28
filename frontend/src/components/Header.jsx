import React from "react";

const Header = ({ user }) => {
  return (
    <div>
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <div>
        <h3>Meus agendamentos</h3>
      </div>
    </div>
  );
};

export default Header;
