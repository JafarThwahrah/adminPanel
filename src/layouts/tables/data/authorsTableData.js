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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import * as React from "react";
import { Link } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import { useCallback } from "react";

// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function data() {
  const [users, setUsers] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [premium, setPremium] = React.useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getallusers")
      .then((res) => {
        console.log(res.data.users);
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(users);
  // console.log(userName);
  // console.log(userEmail);
  // console.log(role);

  // const
  function handleSubmit(event, id) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    data.append("name", userName);
    data.append("email", userEmail);
    data.append("role", role);
    data.append("is_premium", premium);

    // console.log(data.get("role"));
    // console.log(data.get("is_premium"));

    axios
      .post(`http://localhost:8000/api/updateUser/${id}`, data)
      .then((res) => {
        setTimeout(() => {
          window.location.reload(false);
        }, 100);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");

        axios
          .delete(`http://localhost:8000/api/deleteUser/${id}`)
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
    });
  }
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Username", accessor: "Username", width: "45%", align: "left" },
      { Header: "ID", accessor: "status", align: "center" },
      { Header: "Role", accessor: "Role", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: users?.map((user) => {
      return {
        Username: (
          <Author
            image={require(`C:/Apache24/htdocs/Masterpiece/backup/src/images/${user.user_image}`)}
            name={`${user.user_name}`}
            email={`${user.user_email}`}
          />
        ),
        status: <MDBox ml={-1}>{user.id}</MDBox>,
        Role: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {user.user_role}
          </MDTypography>
        ),
        action: (
          <>
            <div className="d-flex flex-row-reverse mt-3">
              <p className="">
                <button
                  onClick={(e) => handleDelete(user.id)}
                  type="button"
                  className="btn btn-danger text-white text-decoration-nsone m-1"
                >
                  Delete
                </button>
                <Link
                  type="button"
                  className="btn btn-info text-white text-decoration-nsone m-1"
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModal${user.id}`}
                >
                  Edit
                </Link>
              </p>

              <div
                className="modal fade"
                id={`exampleModal${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <Box
                  component="form"
                  noValidate
                  onSubmit={(e) => handleSubmit(e, user.id)}
                  sx={{ mt: 3 }}
                >
                  <div className="modal-dialog">
                    <div className="modal-content p-5">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Edit User info
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {/* <form onSubmit={handleSubmit}> */}
                        <div className="mb-3">
                          <label for="username" className="form-label">
                            User Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="username"
                            // value={user.name}
                            onChange={(e) => {
                              setUserName(e.target.value);
                            }}
                          />
                        </div>

                        <div className="mb-3">
                          <label for="email" className="form-label">
                            Email
                          </label>
                          <input
                            onChange={(e) => {
                              setUserEmail(e.target.value);
                            }}
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            // value={user.email}
                          />
                        </div>
                        <div className="mb-3">
                          <label for="role" className="form-label">
                            Role
                          </label>

                          <select
                            name="role"
                            id="role"
                            class="form-control"
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value="Select Premium" disabled selected hidden>
                              Select Role
                            </option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                          {/* <input
                            onChange={(e) => {
                              setRole(e.target.value);
                            }}
                            type="text"
                            name="role"
                            className="form-control"
                            id="role"
                            // value={user.role}
                          /> */}
                        </div>

                        <div className="mb-3">
                          <label for="premium" className="form-label">
                            premium
                          </label>
                          <select
                            name="premium"
                            id="premium"
                            class="form-control"
                            onChange={(e) => setPremium(e.target.value)}
                          >
                            <option value="Select Premium" disabled selected hidden>
                              Select Premium
                            </option>
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                          </select>
                        </div>
                        {/* </form> */}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary publishTourBtn"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary publishTourBtn">
                          Submit
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
