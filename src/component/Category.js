/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useEffect, useState } from "react";
import loader from "../assets/loader.jpg";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const detailRoute = (id) => {
    navigate("/detail/" + id);
  };

  const editRoute = (id) => {
    navigate("/edit/" + id);
  };

  const deleteRoute = (id, imageLink) => {
    if (window.confirm("are you sure")) {
      axios
        .delete(
          "http://localhost:3000/category?" +
            "id=" +
            id +
            "&imageUrl=" +
            imageLink
        )
        .then((res) => {
          console.log(res);
          // window.alert("data deleted");
          getData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("cancel");
    }
  };

  const getData = () => {
    axios
      .get("https://rest-api-main-eight.vercel.app/category", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setHasError(false);
        setLoading(false);
        console.log(res.data.category);
        setCategoryList(res.data.category);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setLoading(false);
        console.log(err);
        setHasError(true);
        setError(err.response.data.msg);
      });
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  // console.log(categoryList);
  return (
    <>
      {isLoading && (
        <div>
          <img style={{ width: "50px" }} src={loader} />
        </div>
      )}
      {!isLoading && !hasError && (
        <div>
          <h1>Category List</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>{categoryList[0].name}</tr>
            <tr>{categoryList[0].photo}</tr> */}

              {/* <tr>
              <td>{categoryList[0].name}</td>
              <td>
                <img src={categoryList[0].photo} />
              </td>
            </tr>
            <tr>
              <td>{categoryList[1].name}</td>
              <td>
                <img src={categoryList[1].photo} />
              </td>
            </tr> */}

              {categoryList?.map((data) => (
                <Row
                  key={data._id}
                  detailReq={detailRoute}
                  editReq={editRoute}
                  deleteReq={deleteRoute}
                  detail={data}
                />
              ))}
            </tbody>
          </table>
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

// eslint-disable-next-line no-unused-vars
const Row = (props) => {
  // console.log(props);
  return (
    <tr>
      <td>{props.detail.name}</td>
      <td>
        <img style={{ width: "50px" }} src={props.detail.photo} />
      </td>
      <td>
        <button
          onClick={() => {
            props.detailReq(props.detail._id);
          }}
        >
          Detail
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            props.editReq(props.detail._id);
          }}
        >
          Edit
        </button>
      </td>

      <td>
        <button
          onClick={() => {
            props.deleteReq(props.detail._id, props.detail.photo);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Category;
