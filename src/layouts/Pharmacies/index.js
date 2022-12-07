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
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { setPharmacies } from "shared/reducers/UserSlice";
import { cartAdd } from "shared/reducers/UserSlice";
import { Link, Navigate } from "react-router-dom";
import MDBadge from "components/MDBadge";

function Pharmacies() {
  const isMobile = useMediaQuery({ query: "(max-width: 786px)" });
  const [medicine, setMedicine] = useState(false);
  const [data, setData] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const isAuth = useSelector((store) => store.root.user.authenticated);

  console.log(isAuth)
  

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
  const [quant, setQuant] = React.useState(0);
  const [rowData, setRowData] = React.useState(null);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.root.user);
  console.log({ store });

  function openModal(rowData) {
    setRowData(rowData);
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function addToCart() {
    console.log({ rowData, selectedId });

    let payload = {
      Identifier: Date.now(),
      medicineId: rowData._id,
      medicinePrice: rowData.Price,
      medicineAvailable: rowData.Quantity,
      medicineName: rowData.Title,
      pharmacyId: selectedId,
      purchaseQuantity: quant,
    };

    if (payload.purchaseQuantity > payload.medicineAvailable) {
      toast.error(`Out of stock`);
    } else {
      dispatch(setPharmacies({ id: selectedId, name: selectedName }));
      dispatch(cartAdd(payload));
      closeModal();
      toast.success(`Added To Cart`);
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox backgroundColor={"#fff"} {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  useEffect(() => {
    getPharmacies();
  }, []);

  const getPharmacies = async () => {
    setLoading(true);
    const posts = await axios.get(endPoint + "/users/pharmacy");
    setData(posts.data.result);
    console.log(posts.data.result);
    setLoading(false);
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
      <Toaster position="top-center" reverseOrder={false} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className="input-group">
          <input
            value={quant}
            onChange={(e) => {
              if (e.target.value >= 0) setQuant(e.target.value);
            }}
            className="form-control"
            type="number"
            required="required"
            placeholder="Enter Quantity"
          />
          <label>Enter Quantity</label>
        </div>
        <Button
          disabled={quant === 0 || quant === ""}
          variant="contained"
          color="success"
          style={{ width: 441, marginTop: 40 }}
          onClick={addToCart}
        >
          ADD TO CART
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
                      Pharmacies
                    </MDTypography>
                  </MDBox>
                  <MaterialTable
                    icons={tableIcons}
                    title=""
                    columns={[
                      { title: 'Name', field: 'fullName' },
                      { title: 'Mail Address', field: 'email' },
                      {
                        title: "Active_Status",
                        render: (rowData) => (
                          <MDBadge badgeContent="online" color="success" variant="gradient" size="lg"/>
                        ),
                      },
                      {
                        title: "Joined",
                        render: (rowData) => (
                          <span className="mt_dt">
                            {moment(rowData.createdAt).format("dddd, MMMM Do YYYY")}
                          </span>
                        ),
                      },
                      {
                        title: "Located At",
                        field: 'address',
                      },
                      
                    ]}
                    actions={[
                      {
                        icon: () => <Search />,
                        tooltip: "find medicine",
                        onClick: (event, rowData) => openPharmacy(event, rowData),
                      },
                    ]}
                    data={data}
                    options={{
                      actionsColumnIndex: -1,
                      headerStyle: {
                        backgroundColor: "transparent",
                        color: "#7b809a",
                        fontSize: '0.8rem',
                        opacity: 0.7,
                        fontStyle: "normal",
                        fontWeight: 700,
                        textTransform: 'uppercase'
                      }
                    }}
                  />
                </Card>
              </Grid>
            )}

            {medicine && (
              <Grid item xs={12}>
                <Card>
                  <MDBox
                    mx={0}
                    mt={-3}
                    py={3}
                    px={2}
                    style={{ display: "flex", width: "100%", justifyContent: "space-between" }}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                      Medicines
                    </MDTypography>
                    <button
                      style={{
                        background: "transparent",
                        cursor: "pointer",
                        border: "none",
                        outline: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => setMedicine(false)}
                    >
                      <ChevronLeft style={{ color: "#fff", fontSize: 26 }} />
                      <MDTypography variant="span" color="white">
                        Back To Pharmacies
                      </MDTypography>
                    </button>
                  </MDBox>
                  <MDBox pt={3}>
                    <MaterialTable
                      icons={tableIcons}
                      title=""
                      columns={[
                        {
                          title: "Identifier",
                          field: "_id",
                        },
                        {
                          title: "Name",
                          field: "Title"
                        },
                        {
                          title: "Stock",
                          field: "Quantity",
                        },
                        {
                          title: "Price (Per Tablet)",
                          field: "Price"
                        },
                        {
                          title: "Price (Per Tablet)",
                          field: "Price"
                        },
                        {
                          title: "Prescription required",
                          render: (rowData) => (
                            <>
                              {rowData.Prescription ? (
                                <MDBadge
                                  badgeContent={`YES`}
                                  color="danger"
                                  variant="gradient"
                                  size="lg"
                                />
                              )
                              :(
                                <MDBadge
                                badgeContent={`NO`}
                                color="primary"
                                variant="gradient"
                                size="lg"
                              />
                              )}
                            </>
                          ),
                        }
                      ]}
                      actions={[
                        {
                          icon: () => <SaveAlt />,
                          tooltip: "add to cart",
                          onClick: (event, rowData) => {
                            rowData.Prescription ? window.location.href = '/prescriptions': openModal(rowData)
                          },
                        },
                      ]}
                      data={stocks}
                      options={{
                        actionsColumnIndex: -1,
                        headerStyle: {
                          backgroundColor: "transparent",
                          color: "#7b809a",
                          fontSize: '0.8rem',
                          opacity: 0.7,
                          fontStyle: "normal",
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }
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

export default Pharmacies;
