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

import Modal from "react-modal";
import { useMediaQuery } from "react-responsive";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@mui/material";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [data, setData] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = React.useState(null);
  const [link, setLink] = React.useState("");
  const [medicine, setMedicine] = useState(false);
  const isAuth = useSelector((store) => store.root.user.authenticated);
  const [selectedId, setSelectedId] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 786px)" });
  const [selectedName, setSelectedName] = useState("");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      position: "relative",
      maxWidth: isMobile ? "90%" : "35%",
      transform: "translate(-50%, -50%)",
      minHeight: 300,
      borderRadius: 20,
      background: "#3F97EF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    overlay: { zIndex: 1000 },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(rowData) {
    setRowData(rowData);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function afterOpenModal() {}

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
      const posts = await axios.post(endPoint + "/users/bookingsByDoctor", {
        doctorId: decoded.id,
      });
      console.log({ posts });
      setData(posts.data.orders);
      setLoading(false);
    }
  };

  const rejectOrder = async (event, rowData) => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);
      const body = {
        orderId: rowData.Identifier,
        doctorId: decoded.id,
        status: "REJECTED",
        patientEmail: rowData.patientEmail,
      };
      console.log({ body });
      const posts = await axios.post(endPoint + "/users/bookingUpdate", body);
      toast.success("Marked as Rejected.", {
        style: {
          border: "1px solid orange",
          padding: "12px",
          color: "orange",
        },
        iconTheme: {
          primary: "orange",
          secondary: "#FFFAEE",
        },
      });
      console.log({ posts });
      setLoading(false);
      getOrders();
    }
  };

  const completeOrder = async (event, rowData) => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);
      const body = {
        orderId: rowData.Identifier,
        doctorId: decoded.id,
        status: "COMPLETED",
        patientEmail: rowData.patientEmail,
      };
      console.log({ body });
      const posts = await axios.post(endPoint + "/users/bookingUpdate", body);
      toast.success("Marked as Completed.", {
        style: {
          border: "1px solid orange",
          padding: "12px",
          color: "orange",
        },
        iconTheme: {
          primary: "orange",
          secondary: "#FFFAEE",
        },
      });
      console.log({ posts });
      setLoading(false);
      getOrders();
    }
  };

  const acceptOrder = async (event, rowData) => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);
      const body = {
        orderId: rowData.Identifier,
        doctorId: decoded.id,
        status: "ACCEPTED",
        patientEmail: rowData.patientEmail,
      };
      console.log({ body });
      const posts = await axios.post(endPoint + "/users/bookingUpdate", body);
      toast.success("Marked as Accepted.", {
        style: {
          border: "1px solid orange",
          padding: "12px",
          color: "orange",
        },
        iconTheme: {
          primary: "orange",
          secondary: "#FFFAEE",
        },
      });
      console.log({ posts });
      setLoading(false);
      getOrders();
    }
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);
      const body = {
        orderId: rowData.Identifier,
        doctorId: decoded.id,
        videoConferenceLink: link,
        patientEmail: rowData.patientEmail,
      };
      console.log({ body });
      const posts = await axios.post(
        endPoint + "/users/bookingCall",
        body
      );
      toast.success("Video Link Added Uploaded.", {
        style: {
          border: "1px solid orange",
          padding: "12px",
          color: "orange",
        },
        iconTheme: {
          primary: "orange",
          secondary: "#FFFAEE",
        },
      });
      console.log({ posts });
      setLoading(false);
      setLink("");
      setIsOpen(false)
      getOrders();
    }
  };

  return isAuth ? (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className="input2">
          <input
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            className="form-control"
            type="text"
            required="required"
            placeholder="Enter Link"
          />
        </div>
        <Button
          disabled={link === ""}
          variant="contained"
          color="success"
          style={{ width: 441, marginTop: 40 }}
          onClick={addToCart}
        >
          Upload Link
        </Button>
      </Modal>
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
                          title: "UNIQUE ID",
                          field: "Identifier",
                        },
                        {
                          title: "Patient",
                          field: "patientEmail",
                        },
                        {
                          title: "Requested Date",
                          render: (rowData) => (
                            <span className="mt_dt">
                              {moment(rowData.Date_Requested).format(
                                "dddd, MMMM Do YYYY"
                              )}
                            </span>
                          ),
                        },
                        {
                          title: "Video Call",
                          render: (rowData) => (
                            <>
                              {rowData.videoConferenceLink === "N/A" ? (
                                <a
                                  className="linking"
                                  onClick={() => openModal(rowData)}
                                >
                                  {" "}
                                  Add Link <ChevronRight />{" "}
                                </a>
                              ) : (
                                <a className="linking"        href={rowData.videoConferenceLink}
                                target="_blank">
                                  {" "}
                                  Join Meeting <ChevronRight />{" "}
                                </a>
                              )}
                            </>
                          ),
                        },
                        {
                          title: "Prescription",
                          render: (rowData) => (
                            <>
                              {rowData.Prescripton === "N/A" ? (
                                <span className="mt_dt">
                                  {" "}
                                  Not Suggested Yet{" "}
                                </span>
                              ) : (
                                <a
                                  className="linking"
                                  href={rowData.Prescripton}
                                  target="_blank"
                                >
                                  {" "}
                                  Open Link <ChevronRight />{" "}
                                </a>
                              )}
                            </>
                          ),
                        },
                        {
                          title: "Description",
                          field: "Details",
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
                      ]}
                      data={data}
                      actions={[
                        {
                          icon: () => <ChevronRight />,
                          tooltip: "Accept Booking",
                          onClick: (event, rowData) =>
                            acceptOrder(event, rowData),
                        },
                        {
                          icon: () => <Clear />,
                          tooltip: "Rejected Booking",
                          onClick: (event, rowData) =>
                            rejectOrder(event, rowData),
                        },
                        {
                          icon: () => <Check />,
                          tooltip: "Mark as Completed",
                          onClick: (event, rowData) =>
                            completeOrder(event, rowData),
                        },
                      ]}
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
