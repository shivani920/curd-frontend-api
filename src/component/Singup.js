/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.jpg";
const Singup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(userName, password, email, phone);
    axios
      .post("https://rest-api-main-eight.vercel.app/user/signup", {
        userName: userName,
        password: password,
        email: email,
        phone: phone,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setHasError(false);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.message);
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
          <h1>Create Account</h1>
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
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="number"
              placeholder="phone"
              onChange={(e) => setPhone(e.target.value)}
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

export default Singup;
