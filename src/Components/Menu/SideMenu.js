import { NavLink } from "react-router-dom";
import "./SideMenu.css";
const SideMenu = () => {
  let permission = window.localStorage.getItem("permission");
  permission = JSON.parse(permission);
  // console.log(permission);
  // let menuItems = [];
  return (
    <>
      <div className="side-menu">
        <div className="logo"></div>
        <ul>
          {permission?.["inventory"]?.["create"] === true && (
            <li>
              <NavLink to="/inventory">Inventory</NavLink>
            </li>
          )}
          {permission["team"]?.["create"] === true && (
            <li>
              <NavLink to="/salesExcutive">Sale Executives</NavLink>
            </li>
          )}
          {permission["order"]?.["create"] === true && (
            <li>
              <NavLink to="/createorder">Create Order</NavLink>
            </li>
          )}
          {permission["order"]?.["read"] === true && (
            <li>
              <NavLink to="/orders">Orders</NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
