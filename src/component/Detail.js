/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loader from "../assets/loader.jpg";

const Detail = () => {
  const [category, setCategory] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  let params = useParams();
  console.log(params);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://rest-api-main-eight.vercel.app/category/" + params.id)
      .then((res) => {
        setLoading(false);
        setHasError(false);
        console.log(res.data.category);
        setCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.response.data.message);
      });
  }, []);
  return (
    <>
      {isLoading && (
        <div>
          <img style={{ width: "50px" }} src={loader} />
        </div>
      )}
      {!isLoading && !hasError && (
        <div>
          <h1>{category.name}</h1>
          <img style={{ width: "50px" }} src={category.photo} />
          <p>detail</p>
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

export default Detail;
