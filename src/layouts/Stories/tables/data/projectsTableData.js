/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { Link } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { Box } from "@mui/material";

// Images

export default function data() {
  const [Story, setStory] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getallbookedtours")
      .then((res) => {
        console.log(res.data.BookedTours);
        setStory(res.data.BookedTours);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(Story);
  function handleDelete(id) {
    if (confirm("Are you sure you want to delete")) {
      axios
        .delete(`http://localhost:8000/api/deleteStory/${id}`)
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            window.location.reload(false);
          }, 100);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return {
    columns: [
      { Header: "ID", accessor: "ID", width: "45%", align: "left" },
      { Header: "Tourist ID", accessor: "userid", align: "center" },
      { Header: "Advisor ID", accessor: "storyid", align: "center" },
      { Header: "Price", accessor: "Price", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: Story?.map((comment) => {
      return {
        ID: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {comment.id}
          </MDTypography>
        ),
        userid: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {comment.user_id}
          </MDTypography>
        ),
        storyid: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {comment.user_id2}
          </MDTypography>
        ),
        Price: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {comment.tour_price} JOD
          </MDTypography>
        ),
        action: (
          <>
            <div className="d-flex flex-row-reverse mt-3">
              <p className="">
                <button
                  onClick={(e) => handleDelete(comment.id)}
                  type="button"
                  className="btn btn-danger text-white text-decoration-nsone m-1"
                >
                  Delete
                </button>
              </p>

              <div
                className="modal fade"
                id={`exampleModal${comment.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <Box
                  component="form"
                  noValidate
                  onSubmit={(e) => handleSubmit(e, comment.id)}
                  sx={{ mt: 3 }}
                >
                  <div className="modal-dialog">
                    <div className="modal-content p-5">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Story Content
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="mb-3">{comment.pages}</div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary publishTourBtn"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </>
        ),
      };
    }),
  };
}
