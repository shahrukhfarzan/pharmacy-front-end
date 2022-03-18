import "./Login.css";
import { useState } from "react";
import { loginApi } from "../Api/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  let navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const loginAction = () => {
    let form = { userName: username, password: password };
    if (!form.userName || !form.password)
      return window.alert("Required is missing");
    loginApi(form)
      .then((data) => {
        // console.log({ data });
        let error = data?.["error"];
        if (error === false) {
          window.localStorage.setItem("user", JSON.stringify(data.user));
          window.localStorage.setItem(
            "permission",
            JSON.stringify(data.permission)
          );
          navigate(data?.user?.["role"] !== "SALES" ? "/inventory" : "/orders");
        } else {
          window.alert(data["message"]);
        }
      })
      .catch((e) => {
        return window.alert("Auth failed");
      });
  };
  return (
    <>
      <div className="form-container">
        <div className="form-wrapper">
          <h3>Pharmacy</h3>
          <div className="input-wrapper">
            <input
              type="text"
              name="username"
              className="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="Password"
              name="Password"
              className="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>

          <input
            onClick={loginAction}
            type="button"
            name="log"
            className="btn"
            id="log"
            value="LOGIN"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
