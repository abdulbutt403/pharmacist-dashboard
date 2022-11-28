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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Prescripted from "layouts/Prescripted";
import Samples from "layouts/samples";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Reports from "layouts/Reports";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import Pharmacies from "layouts/Pharmacies";
import Labs from "layouts/Labs";
import EditProfile from "layouts/EditProfile";
import AddForm from "layouts/AddForm";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    margin: false,
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Labs",
    key: "labs",
    margin: false,
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/labs",
    component: <Labs />,
  },
  {
    type: "collapse",
    name: "Sample Requests",
    key: "samples",
    margin: true,
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/samples",
    component: <Samples />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "searching",
    margin: true,
    icon: <Icon fontSize="small">Reports</Icon>,
    route: "/searching",
    component: <Reports />,
  },
  {
    type: "collapse",
    name: "Pharmacies",
    key: "pharmacies",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/pharmacies",
    margin: false,
    component: <Pharmacies />,
  },
  {
    type: "collapse",
    name: "Orders",
    margin: true,
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Prescripted Orders",
    margin: true,
    key: "prescripted",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/prescripted",
    component: <Prescripted />,
  },
  {
    type: "collapse",
    name: "Prescriptions",
    margin: true,
    key: "prescriptions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/prescriptions",
    component: <AddForm />,
  },
  {
    type: "collapse",
    name: "Edit Profile",
    margin: false,
    key: "edit_profile",
    icon: <Icon fontSize="small">Edit</Icon>,
    route: "/edit_profile",
    component: <EditProfile />,
  },
  {
    type: "collapse",
    name: "Cart",
    key: "cart",
    margin: false,
    icon: <Icon fontSize="small">Cart</Icon>,
    route: "/cart",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    margin: false,
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    margin: false,
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
