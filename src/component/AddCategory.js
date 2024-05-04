/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import axios from "axios";
import imageLogo from "../assets/User Avatar (2).png";
import loader from "../assets/loader.jpg";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(imageLogo);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", category);
    formData.append("photo", selectedFile);

    axios
      .post("https://rest-api-main-eight.vercel.app/category", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/dashboard/category");
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setHasError(true);
        setError(err.message);
      });
  };
  return (
    <>
      {isLoading && (
        <div>
          <img style={{ width: "150px" }} src={loader} />
        </div>
      )}
      {!isLoading && hasError && (
        <div>
          <h1>Add new category</h1>
          <form onSubmit={submitHandler}>
            <input
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              type="text"
            />
            <input
              onChange={(e) => {
                fileHandler(e);
              }}
              type="file"
            />
            <button type="submit">Submit</button>
            <br />
            <img style={{ width: "50px" }} src={imageUrl} />
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

export default AddCategory;
