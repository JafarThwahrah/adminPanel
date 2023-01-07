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
import Divider from "@mui/material/Divider";

// @mui icons

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data
// Images

import axios from "axios";
import { useEffect,useState } from "react";
function Overview() {
const [user, setUser] = useState("")

useEffect(() => {
  axios.get("http://127.0.0.1:8000/api/users/1")
.then(res => {
  console.log(res.data)
  setUser(res.data)
})
.catch(err => {
  console.error(err); 
})
}, [])



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header person={user.name} role={user.role} image={user.image}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
             
             
             
              {/* Add user info here from the api */}
              <ProfileInfoCard
                title="profile information"
                description={`Hi, i am ${user.name}, in Decisions: If you cant decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).`}
                info={{
                  fullName:user.name,
                  mobile: "(44) 123 1234 123",
                  email: user.email,
                 
                }}
                action={{ route:`/EditProfile/${user.id}` , tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
