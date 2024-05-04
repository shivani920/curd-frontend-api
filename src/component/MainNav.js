import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MainNav = () => {
  let navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Link to="/dashboard/category">Category List</Link>
      <Link to="/dashboard/add-category">Add New Category List</Link>
      <br />
      <p>userName{localStorage.getItem("userName")}!</p>
      <button onClick={logoutHandler}>LOGOUT</button>
    </>
  );
};

export default MainNav;
