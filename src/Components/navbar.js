import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  let logout = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("permission");

    navigate("/");
  };
  return (
    <nav
      style={{
        width: "100%",
        padding: "1rem",
        height: "80px",
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <button
        onClick={logout}
        style={{ padding: "10px 14px", background: "red", color: "white" }}
      >
        logout
      </button>
    </nav>
  );
};
export default Navbar;
