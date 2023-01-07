/* eslint-disable */

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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import axios from "axios";
import Swal from "sweetalert2";

// Data
import authorsTableData from "layouts/Posts/tables/data/projectsTableData";

function Tables() {
  const { columns, rows } = authorsTableData();

  function handleSubmitAdd(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data.get("destination_name"));
    // data.append("destination_image", selectedDestination);

    axios
      .post("http://localhost:8000/api/newdestination", data)
      .then((res) => {
        console.log(res);
        Swal.fire("Success!", "Destination has been added successfully.", "success");
        // setTimeout(() => {
        //   window.location.reload(false);
        // }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <button
        type="button"
        class="btn btn-primary bg-gradient m-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        ADD NEW DESTINATION
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div style={{ padding: "3rem" }} class="modal-content ">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                ADD NEW DESTINATION
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={(e) => handleSubmitAdd(e)} action="">
                <div class="form-floating">
                  <input
                    name="destination_name"
                    type="text"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Destination Name"
                  />
                  <label for="floatingPassword">Destination Name</label>
                </div>

                <div class="form-floating mt-3">
                  <p style={{ paddingTop: "2rem" }}>Choose image</p>

                  <input
                    type="file"
                    name="destination_image"
                    class="form-control"
                    id="floatingInput"
                  />
                  <label for="floatingInput"></label>
                </div>
                <div class="mt-3">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" style={{ margin: "1rem" }} class="btn btn-primary">
                    Add Destination
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <MDBox style={{ paddingTop: "2rem" }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="warning"
                borderRadius="lg"
                coloredShadow="warning"
              >
                <MDTypography variant="h6" color="white">
                  Destinations Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
