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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import { useEffect } from "react";
import * as React from "react";
import axios from "axios";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [users, setUsers] = React.useState([]);
  const [stories, setStories] = React.useState([]);
  const [Inqueries, setInqueries] = React.useState([]);
  const [Post, setPost] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getallusers")
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8000/api/getalltours")
      .then((res) => {
        console.log(res.data);
        setStories(res.data.tours);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8000/api/getallbookedtours")
      .then((res) => {
        console.log(res.data);
        setInqueries(res.data.BookedTours);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8000/api/destinations")
      .then((res) => {
        console.log(res.data);
        setPost(res.data.destinations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Users"
                count={users.length}
                percentage={
                  {
                    // color: "success",
                    // amount: "",
                    // label: "Just updated",
                  }
                }
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<HistoryEduIcon />}
                title="Tours"
                count={stories.length}
                percentage={
                  {
                    // color: "success",
                    // amount: "+55%",
                    // label: "than lask week",
                  }
                }
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<MarkAsUnreadIcon size="medium" />}
                title="Booked Tours"
                count={Inqueries.length}
                percentage={
                  {
                    // color: "success",
                    // amount: "+3%",
                    // label: "than last month",
                  }
                }
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<DynamicFeedIcon />}
                title="Destinations"
                count={Post.length}
                percentage={
                  {
                    // color: "success",
                    // amount: "+1%",
                    // label: "than yesterday",
                  }
                }
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          {/* <Grid container spacing={3}> */}
          {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid> */}
          {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid> */}
          {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
          {/* </Grid> */}
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
