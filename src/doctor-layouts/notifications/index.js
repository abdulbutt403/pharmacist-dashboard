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
import { Navigate } from "react-router-dom";
import MDBadge from "components/MDBadge";
import jwt from "jwt-decode";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { UploadFile } from "@mui/icons-material";

function Pharmacies() {
  const isMobile = useMediaQuery({ query: "(max-width: 786px)" });
  const [medicine, setMedicine] = useState(false);
  const [Identifier, setIdentier] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const isAuth = useSelector((store) => store.root.user.authenticated);

  console.log(isAuth);

  const [original_filename, setFileName] = useState("");
  const [quant, setQuant] = React.useState(0);
  const [rowData, setRowData] = React.useState(null);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.root.user);
  console.log({ store });

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

  var [title, setTitle] = useState("");
  var [quantity, setQuantity] = useState("");
  var [price, setPrice] = useState("");
  var [data, setData] = useState([]);

  const createMedicine = async (body) => {
    const { title, quantity, price } = body;

    console.log({ title, quantity, price });

    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);
      setLoading(true);
      const payload = {
        pharmacyId: decoded.id,
        Title: title,
        Quantity: quantity,
        Identifier: Math.floor(Math.random() * 100 + 1) + Date.now(),
        Price: price,
      };

      console.log({ payload });
      const posts = await axios.post(endPoint + "/users/addMedicine", payload);
      toast.success("Successfully Entered Medicine");
      console.log({ posts });
      setLoading(false);
    }
  };

  const handleUploads = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dmsus6w9v",
        uploadPreset: "fvofnssw",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setSelectedImage(result.info.secure_url);
          setFileName(result.info.original_filename);
        }
      }
    );
    myWidget.open();
  };

  const completeOrder = async (event, rowData) => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);
      const body = {
        orderId: Identifier,
        doctorId: decoded.id,
        prescribe: selectedImage,
        patientEmail: patientEmail,
      };
      console.log({ body });
      const posts = await axios.post(
        endPoint + "/users/bookingPrescribe",
        body
      );
      toast.success("Test/Prescription Uploaded.", {
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
      setIdentier("");
      setPatientEmail("");
      setSelectedImage("");
      getOrders();
    }
  };

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

  useEffect(() => {
    getOrders();
  }, []);

  return isAuth ? (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={6} style={{ margin: "auto" }}>
              <Card style={{ padding: "7%" }}>
                <p
                  style={{
                    fontSize: 14,
                    color: "#000",
                    textTransform: "uppercase",
                    transform: "translateY(15px)",
                  }}
                >
                  Select Patient's Email
                </p>
                <Select
                  style={{
                    width: "100%",
                    marginTop: 30,
                    height: 40,
                    marginBottom: 20,
                  }}
                  value={patientEmail}
                  placeholder={`Select Report ID`}
                  onChange={(e) => setPatientEmail(e.target.value)}
                >
                  {data.map((e, i) => (
                    <MenuItem key={i} value={e.patientEmail}>
                      {e.patientEmail}
                    </MenuItem>
                  ))}
                </Select>
                <p
                  style={{
                    fontSize: 14,
                    color: "#000",
                    textTransform: "uppercase",
                    transform: "translateY(15px)",
                  }}
                >
                  COPY PASTE APPOINTNMENT ID AND UPLOAD TESTS/PRESCRIPTIONS AGINST IT
                </p>
                <div className="input2" style={{marginTop: 20, marginBottom: 20, border: 'none'}}>
                  <input
                    value={Identifier}
                    style={{border: '1px solid rgba(0,0,0,0.3)'}}
                    onChange={(e) => {
                      setIdentier(e.target.value);
                    }}
                    className="form-control"
                    type="text"
                    required="required"
                    placeholder="Enter Unique Id"
                  />
                </div>
                <div style={{ display: "flex", alignItems: "end" }}>
                  <button
                    id="upload_widget"
                    onClick={handleUploads}
                    className="cloudinary-button"
                  >
                    Choose File
                  </button>
                  {original_filename !== 0 && original_filename !== "" && (
                    <span
                      style={{ fontSize: 12, fontWeight: "600", marginLeft: 6 }}
                    >
                      {original_filename}
                    </span>
                  )}
                </div>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    disabled={
                      original_filename === "" ||
                      original_filename === 0 ||
                      Identifier.length === 0 ||
                      Identifier === ""
                    }
                    onClick={() => completeOrder()}
                  >
                    UPLOAD TEST/PRESCRIPTIONS
                  </MDButton>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </React.Fragment>
  ) : (
    <Navigate to="/authentication/sign-in" />
  );
}

export default Pharmacies;
