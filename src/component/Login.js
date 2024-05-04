/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.jpg";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(userName, password, email, phone);
    axios
      .post("https://rest-api-main-eight.vercel.app/user/login", {
        userName: userName,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.userName);
        setHasError(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setHasError(true);
        setError(err.response.data.msg);
      });
  };

  return (
    <>
      {isLoading && (
        <div>
          <img style={{ width: "50px" }} src={loader} />
        </div>
      )}
      {!isLoading && !hasError && (
        <div>
          <h1>Login</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="userName"
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {hasError && (
        <div>
          <p style={{ color: "red" }}>Error:-{error}</p>
        </div>
      )}
    </>
  );
};

export default Login;
