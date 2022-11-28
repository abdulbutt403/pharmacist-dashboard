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

import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
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
import { Navigate } from "react-router-dom";
import { saveAs } from 'file-saver'

function Notifications() {
  const [Identifier, setIdentifier] = React.useState("");
  const [imgSrc, SetImage] = React.useState("");
  const [notF, setNotF] = React.useState(false);
  const isAuth = useSelector((store) => store.root.user.authenticated);

  const downloadImage = () => {
    saveAs(imgSrc, 'image.jpg') // Put your image url here.
  }

  const GetData = async () => {
    const payload = {
      Identifier,
    };

    const posts = await axios.post(endPoint + "/users/getReport", payload);
    const found = posts.data.found;
    if (!found) {
      setNotF(true);
    }
    SetImage(posts.data.found.Image);
  };

  return isAuth ? (
    <DashboardLayout>
      <DashboardNavbar />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="heading">Enter Request ID to search for its Report</h1>
        <div className="searchInputWrapper">
          <input
            className="searchInput"
            type="text"
            placeholder="focus here to search"
            value={Identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
            }}
          />
          <i
            style={{ cursor: "pointer" }}
            className="searchInputIcon fa fa-search"
            onClick={GetData}
          ></i>
        </div>
        {!(imgSrc === "") && (
          <>
          <img
            style={{ maxWidth: 800, objectFit: "contain", marginTop: 50 }}
            src={imgSrc}
          />

          <a  onClick={downloadImage} style={{border: 'none', background: 'green', color: "#fff", padding: 4, marginTop: 20, borderRadius: 4, cursor: 'pointer'}}>Download</a>
          </>
        )}

        {notF && <h1 className="heading" style={{fontSize: 14, color: 'red', fontWeight: '500', textTransform: 'uppercase', marginTop: 100}}>No Report Uploaded Agaisnt this number Yet</h1>}
      </div>
    </DashboardLayout>
  ) : (
    <Navigate to="/authentication/sign-in" />
  );
}

export default Notifications;
