import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import axios from "axios";
import { endPoint } from "contants";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const isAuth = useSelector((store) => store.root.user.authenticated);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  console.log(isAuth);

  const getLabs = async () => {
    const posts = await axios.get(endPoint + "/users/labs");
    setData3(posts.data.result);
  };

  const getPharmacies = async () => {
    const posts = await axios.get(endPoint + "/users/pharmacy");
    setData2(posts.data.result);
  };

  const getOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);
      const posts = await axios.post(endPoint + "/users/orderByPatient", {
        patientEmail: decoded.email,
      });
      console.log({ posts });
      setData(posts.data.orders);
    }
  };

  useEffect(() => {
    getPharmacies();
    getLabs();
    getOrders();
  }, []);

  return isAuth ? (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Appoitments"
                  description={<>{<strong>{data2.length}</strong>} Pending Appointments</>}
                  date="just updated"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Patients"
                  description={<>{<strong>{data3.length}</strong>} Active Patients </>}
                  date="just updated"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Completed"
                  description={<>{<strong>{data.length}</strong>} Completed Appointments</>}
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
          
        </MDBox>
      </MDBox>
    </DashboardLayout>
  ) : (
    <Navigate to="/authentication/sign-in" />
  );
}

export default Dashboard;
