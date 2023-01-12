import React, { useRef, useState } from "react";
import Modal from "react-modal";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartDelete, pharmDelete } from "shared/reducers/UserSlice";
import jwt from "jwt-decode";
import axios from "axios";
import { endPoint } from "contants";
import toast, { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { Button } from "@mui/material";
import StripeCheckout from "react-stripe-checkout";
import { publishKey } from "contants";
import { secretKey } from "contants";
import { contentType } from "contants";

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const stripeRef = useRef(null);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <MDTypography
        component="a"
        href="#"
        variant="body2"
        fontWeight="medium"
        color="white"
      >
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  const dispatch = useDispatch();

  const cartIs = useSelector((store) => store.root.user.cart);

  const sendOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);

      const medicines = [];

      dat.medicines.forEach((e) => {
        let objToPush = {
          Title: e.medicineName,
          Quantity: parseInt(e.purchaseQuantity),
          Price: e.medicinePrice,
        };

        medicines.push(objToPush);
      });

      let payload = {
        state: "PENDING",
        patientEmail: decoded.email,
        pharmacyId: dat.pharmacy.id,
        pharmacyName: dat.pharmacy.name,
        Medicines: medicines,
        Identifier: Math.floor(Math.random() * 100 + 1) + Date.now(),
        address,
        phoneNumber,
      };

      console.log({ payload });

      if (payload) {
        const res = await axios.post(endPoint + "/users/order", payload);
        if (res.data.success) {
          toast.success(`Successfully placed order`);
          dispatch(pharmDelete(payload.pharmacyId));

          cartIs.forEach((med) => {
            if (med.pharmacyId === payload.pharmacyId) {
              dispatch(cartDelete(med.Identifier));
            }
          });
          closeModal();
        }
      }
    }
  };

  const pharmacies = useSelector((store) => store.root.user.pharmacies);
  const cart = useSelector((store) => store.root.user.cart);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [dat, setDat] = React.useState({});
  const isMobile = useMediaQuery({ query: "(max-width: 786px)" });

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

  function openModal(data) {
    setDat(data);
    setIsOpen(true);
  }

  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const handleCheck = (e) => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    if (e.target.checked) {
      let addressLocal = localStorage.getItem("upAddress");
      if (addressLocal) {
        setAddress(addressLocal);
      } else {
        const decoded = jwt(token);
        setAddress(decoded.address);
      }
    } else {
      setAddress("");
    }
  };

  const handleToken = async (token) => {
    try {
      const { id: tokenId } = token;
      const { name: pharmacyName } = dat.pharmacy;
      const amount = 50 * 1000;
      const currency = "pkr";
      const description = `Pay to ${pharmacyName}`;
      const body = `amount=${amount}&currency=${currency}&description=${description}&source=${tokenId}`;
      const headers = {
        "Content-Type": contentType,
        Authorization: `Bearer ${secretKey}`,
      };
      const method = "POST";

      const response = await fetch(stripeUrl, {
        method,
        headers,
        body,
      });

      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        sendOrder();
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleClosed = () => {
    // handle checkout closed event
  };

  return pharmacies.length > 0 && cart.length > 0 ? (
    <DashboardLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className="input-group" style={{ borderRadius: 10, padding: 5 }}>
          <input
            style={{ padding: 25 }}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            className="form-control"
            type="text"
            required="required"
            placeholder="Enter Quantity"
          />
          <label style={{ top: -30, padding: 25 }}>Enter Address</label>
        </div>
        <div className="input-group" style={{ borderRadius: 10, padding: 5 }}>
          <input
            style={{ padding: 25 }}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            className="form-control"
            type="text"
            required="required"
            placeholder="Enter Quantity"
          />
          <label style={{ top: -30, padding: 25 }}>Enter Phone</label>
        </div>

        <div style={{ display: "flex", width: "84%" }}>
          <input type={"checkbox"} onChange={handleCheck} />
          <a className="useexist">Use Existing Addess</a>
        </div>

        {!(
          address === 0 ||
          address === "" ||
          phoneNumber === 0 ||
          phoneNumber === ""
        ) && (
          <StripeCheckout
            ref={stripeRef}
            stripeKey={publishKey}
            name="Your business name"
            description="Your product or service"
            amount={1099} //amount in cents
            currency="pkr"
            email="arrowestates403@gmail.com"
            token={handleToken}
            closed={handleClosed}
          />
        )}
      </Modal>
      <DashboardNavbar />
      <MDBox mt={6} mb={3} style={{ display: "flex", flexWrap: "wrap" }}>
        {pharmacies.map((element, index) => (
          <React.Fragment key={index}>
            {cart.filter((e) => e.pharmacyId === element.id).length ? (
              <Grid
                container
                spacing={1}
                justifyContent="center"
                style={{ flexBasis: "50%", marginBottom: 50 }}
              >
                <Grid item xs={12} lg={10}>
                  <Card style={{ minHeight: 500 }}>
                    <MDBox p={2}>
                      <MDTypography variant="h5">{element.name}</MDTypography>
                    </MDBox>
                    {cart
                      .filter((e) => e.pharmacyId === element.id)
                      .map((x, i) => (
                        <MDBox pt={2} px={2} key={i}>
                          <MDAlert
                            color="success"
                            style={{ fontSize: 17, fontWeight: 400 }}
                          >
                            {`${x.medicineName} (${
                              x.purchaseQuantity
                            }) | Total : ${
                              x.purchaseQuantity * x.medicinePrice
                            } RS`}
                            <i
                              className="fa fa-times"
                              style={{
                                position: "absolute",
                                right: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dispatch(cartDelete(x.Identifier))}
                            />
                          </MDAlert>
                        </MDBox>
                      ))}
                    <button
                      className="button-3 mt-5 ml-1"
                      role="button"
                      style={{ margin: 20 }}
                      onClick={() =>
                        openModal({
                          medicines: cart.filter(
                            (e) => e.pharmacyId === element.id,
                          ),
                          pharmacy: element,
                        })
                      }
                    >
                      Place Order
                    </button>
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </React.Fragment>
        ))}
      </MDBox>
    </DashboardLayout>
  ) : (
    <DashboardLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <DashboardNavbar />
      <MDBox
        mt={6}
        mb={3}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 500,
          textTransform: "uppercase",
          color: "red",
          fontSize: 30,
        }}
      >
        Your cart is Empty !
      </MDBox>
    </DashboardLayout>
  );
}

export default Notifications;
