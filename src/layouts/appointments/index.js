import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import DataTable from "examples/Tables/DataTable";
import React, { forwardRef, useState, useEffect } from "react";
import jwt from "jwt-decode";
// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import axios from "axios";
import { endPoint } from "contants";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import moment from "moment";
import MaterialTable from "material-table";
import MDBadge from "components/MDBadge";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [data, setData] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [medicine, setMedicine] = useState(false);
  const isAuth = useSelector((store) => store.root.user.authenticated);
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const tableIcons = {
    Add: forwardRef((props, ref) => (
      <AddBox backgroundColor={"#fff"} {...props} ref={ref} />
    )),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);
      setLoading(true);
      const posts = await axios.post(endPoint + "/users/bookingsByPatient", {
        patientEmail: decoded.email,
      });
      console.log({ posts });
      setData(posts.data.orders);
      setLoading(false);
    }
  };

  const openPharmacy = (event, rowData) => {
    setSelectedId(rowData._id);
    setSelectedName(rowData.fullName);
    let st = data.find((e) => e._id === rowData._id);
    setStocks(st.Medicines);
    setMedicine(true);
  };

  return isAuth ? (
    <React.Fragment>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            {!medicine && (
              <Grid item xs={12}>
                <Card>
                  <MDBox
                    mx={0}
                    mt={-3}
                    py={3}
                    px={2}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                      Orders
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <MaterialTable
                      icons={tableIcons}
                      title=""
                      columns={[
                        {
                          title: "Doctor",
                          field: "doctorName",
                        },
                        {
                          title: "Status",
                          render: (rowData) => (
                            <>
                              {rowData.state === "PENDING" && (
                                <MDBadge
                                  badgeContent={rowData.state}
                                  color="secondary"
                                  variant="gradient"
                                  size="lg"
                                />
                              )}
                              {rowData.state === "COMPLETED" && (
                                <MDBadge
                                  badgeContent={rowData.state}
                                  color="info"
                                  variant="gradient"
                                  size="lg"
                                />
                              )}
                              {rowData.state === "ACCEPTED" && (
                                <MDBadge
                                  badgeContent={rowData.state}
                                  color="info"
                                  variant="gradient"
                                  size="lg"
                                />
                              )}
                              {rowData.state === "REJECTED" && (
                                <MDBadge
                                  badgeContent={rowData.state}
                                  color="primary"
                                  variant="gradient"
                                  size="lg"
                                />
                              )}
                            </>
                          ),
                        },
                        {
                          title: "Requested At",
                          render: (rowData) => (
                            <span className="mt_dt">
                              {moment(rowData.createdAt).format(
                                "dddd, MMMM Do YYYY",
                              )}
                            </span>
                          ),
                        },
                        {
                          title: "Video Call",
                          render: (rowData) => (
                            <>
                              {(rowData.videoConferenceLink === "N/A" ? <span className="mt_dt"> Not Uploaded Yet </span>: <a className="linking" href={rowData.videoConferenceLink} target={`_blank`}> Join Meeting <ChevronRight/> </a> )}
                            </>
                          ),
                        },
                        {
                          title: "Tests/Prescription",
                          render: (rowData) => (
                            <>
                              {(rowData.Prescripton === "N/A" ? <span className="mt_dt"> Not Suggested Yet </span>: <a className="linking" href={rowData.Prescripton} target={`_blank`}> Open Link <ChevronRight/> </a> )}
                            </>
                          ),
                        },
                        {
                          title: "Description",
                          field: "Details",
                        },
                      ]}
                      data={data}
                      options={{
                        actionsColumnIndex: -1,
                        headerStyle: {
                          backgroundColor: "transparent",
                          color: "#7b809a",
                          fontSize: "0.8rem",
                          opacity: 0.7,
                          fontStyle: "normal",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        },
                      }}
                    />
                  </MDBox>
                </Card>
              </Grid>
            )}
          </Grid>
        </MDBox>
      </DashboardLayout>
    </React.Fragment>
  ) : (
    <Navigate to="/authentication/sign-in" />
  );
}

export default Tables;
