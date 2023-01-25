
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
import {Navigate} from 'react-router-dom'
import axios from "axios";
import { endPoint } from "contants";
import jwt from "jwt-decode";
import React , {useState, useEffect} from 'react'



function Dashboard() {
  const { sales, tasks } = reportsLineChartData; 
  const isAuth = useSelector((store) => store.root.user.authenticated);
  const [data, setData] = useState([]);
  const [stocks, setStocks] = useState([]);
  console.log(isAuth)



  const getOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);
      const posts = await axios.post(endPoint + "/users/orderByPharmacy", {
        pharmacyId: decoded.id,
      });
      console.log({ posts });
      setData(posts.data.orders);
    }
  };

  useEffect(() => {
    getOrders();
    getMedicines()
  }, []);


  const getMedicines = async () => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);

      const posts = await axios.post(endPoint + "/users/medicineByPharmacy", {
        pharmacyId: decoded.id,
      });
      console.log({ posts });
      setStocks(posts.data.orders);
    
    }
  };
  

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
                  title="Medicines"
                  description={
                    <>
                      <strong>{stocks.length}</strong> total medicines
                    </>
                  }
                  date="just updated"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Orders"
                  description={
                    <>
                      <strong>{data.length}</strong> orders all time
                    </>
                  }
                  date="just updated"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Sales"
                  description={
                    <>
                      <strong>{data.filter(e => e.state === 'DELIVERED').length}</strong> orders completed
                    </>
                  }
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  ): (
    <Navigate to="/authentication/sign-in" /> 
  );
}

export default Dashboard;
