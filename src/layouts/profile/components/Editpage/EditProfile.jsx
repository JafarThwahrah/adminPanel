/* eslint-disable */

import { Box } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
function EditProfile(props) {
  const [users, setUsers] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [premium, setPremium] = React.useState("");
  const nav=useNavigate('')
  const { id } = useParams();
  console.log(id);
  const handleClose=()=>{
    nav('/profile')
  }
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    data.append("name", userName);
    data.append("email", userEmail);
    data.append("role", role);
    data.append("is_premium", premium);
    
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
        .post(`http://localhost:8000/api/updateUser/${id}`, data)
        .then((res) => {
          Swal.fire(
            'Profile updated!',
            '',
            'success'
          )        })
        .catch((err) => {
          console.log(err);
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  

   
  }
    return (
        <DashboardLayout>
        <DashboardNavbar />
    <div className="container w-50">
    <Box
                  component="form"
                  noValidate
                  onSubmit={(e) => handleSubmit(e)}
                  sx={{ mt: 3 }}
                >
                  <div className="modal-dialog">
                    <div className="modal-content p-5">
                      <div className="modal-header">
                        <h1 className="modal-title text-center fs-5" id="exampleModalLabel">
                          Edit User info
                        </h1>
                       
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
                    onClick={()=>handleClose()}
                          type="button"
                          className="btn btn-secondary publishTourBtn"
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
            </DashboardLayout>
  );
}

export default EditProfile;
