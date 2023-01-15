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
import Save from "@material-ui/icons/Save";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Modal from "react-modal";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { endPoint } from "contants";
import { useMediaQuery } from "react-responsive";
import { Button, MenuItem, Select } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { setPharmacies } from "shared/reducers/UserSlice";
import { cartAdd } from "shared/reducers/UserSlice";
import { Link, Navigate } from "react-router-dom";
import MDBadge from "components/MDBadge";
import { Message } from "@material-ui/icons";
import jwt from "jwt-decode";

function Pharmacies() {
  const isMobile = useMediaQuery({ query: "(max-width: 786px)" });
  const [medicine, setMedicine] = useState(false);
  const [data, setData] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const isAuth = useSelector((store) => store.root.user.authenticated);

  console.log(isAuth);

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
      paddingTop: 50,
      paddingBottom: 50,
      background: "#3F97EF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    overlay: { zIndex: 1000 },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [tests, setTests] = React.useState([]);
  const [row, setRow] = React.useState("");
  const [requestedDate, setDate] = React.useState("");
  const [requestedTime, setTime] = React.useState("");
  const [rowData, setRowData] = React.useState(null);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.root.user);
  console.log({ store });

  function openModal(rowData) {
    setTests(rowData.tests);
    setReason(rowData.tests[0].title);
    setRow(rowData);
    setSelectedId(rowData._id);
    setSelectedName(rowData.fullName);
    setRowData(rowData);
    setIsOpen(true);
  }

  function afterOpenModal() {}

  const sendRequest = async () => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);

      let payload = {
        labId: selectedId,
        labName: selectedName,
        Reason: reason,
        Date_Requested: requestedDate,
        state: "PENDING",
        patientEmail: decoded.email,
        Identifier: Math.floor(Math.random() * 100 + 1) + Date.now(),
      };

      console.log({ payload });

      if (payload) {
        const res = await axios.post(
          endPoint + "/users/sample_request",
          payload,
        );
        if (res.data.success) {
          toast.success(`Successfully placed request`);
          closeModal();
        }
      }
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

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
    getLabs();
  }, []);

  const getLabs = async () => {
    setLoading(true);
    const posts = await axios.get(endPoint + "/users/labs");
    setData(posts.data.result);
    console.log(posts.data.result);
    setLoading(false);
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
            value={requestedDate}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="form-control"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            required="required"
            placeholder="At what date you want"
          />
        </div>
        <Select
          style={{
            width: 441,
            marginTop: 30,
            background: "#fff",
            height: 60,
            marginBottom: 12,
            cursor: "pointer",
          }}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          {tests.map((e, i) => (
            <MenuItem key={i} value={e.title}>
              {e.title}
            </MenuItem>
          ))}
        </Select>
        <Button
          disabled={reason.length === 0 || requestedDate === ""}
          variant="contained"
          color="success"
          style={{ width: 441, marginTop: 40 }}
          onClick={sendRequest}
        >
          Place Request
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
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                      Labs
                    </MDTypography>
                  </MDBox>
                  <MaterialTable
                    icons={tableIcons}
                    title=""
                    columns={[
                      { title: "Name", field: "fullName" },
                      { title: "Mail Address", field: "email" },
                      {
                        title: "Active_Status",
                        render: (rowData) => (
                          <MDBadge
                            badgeContent="online"
                            color="success"
                            variant="gradient"
                            size="lg"
                          />
                        ),
                      },
                      {
                        title: "Joined",
                        render: (rowData) => (
                          <span className="mt_dt">
                            {moment(rowData.createdAt).format(
                              "dddd, MMMM Do YYYY",
                            )}
                          </span>
                        ),
                      },
                      {
                        title: "Chat Now",
                        render: (rowData) => (
                          <a
                            href={`https://wa.me/${rowData.phoneNumber}`}
                            target={"_blank"}
                          >
                            <i
                              style={{
                                color: "green",
                                fontSize: 32,
                                transform: "translate(10px, 5px)",
                              }}
                              class="fa fa-whatsapp"
                              aria-hidden="true"
                            ></i>
                          </a>
                        ),
                      },
                      {
                        title: "Located At",
                        field: "address",
                      },
                    ]}
                    actions={[
                      {
                        icon: () => <Message />,
                        tooltip: "Send Request",
                        onClick: (event, rowData) => openModal(rowData),
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

export default Pharmacies;
