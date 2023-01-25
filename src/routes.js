import Dashboard from "layouts/dashboard";
import Dashboard2 from "pharmacy-layouts/dashboard";
import Tables from "layouts/tables";
import Tables2 from "pharmacy-layouts/tables";
import Prescripted from "layouts/Prescripted";
import Samples from "layouts/samples";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Reports from "layouts/Reports";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Verify from "layouts/authentication/verify-up";
import History2 from "pharmacy-layouts/history";
// @mui icons
import Icon from "@mui/material/Icon";
import Pharmacies from "layouts/Pharmacies";
import Labs from "layouts/Labs";
import Doctors from "layouts/Doctors";
import Appointments from "layouts/appointments";
import EditProfile from "layouts/EditProfile";
import AddForm from "layouts/AddForm";
import Pharmacies2 from "pharmacy-layouts/Pharmacies";
import AddForm2 from "pharmacy-layouts/AddForm";
import EditProfile2 from "pharmacy-layouts/EditProfile";
import Prescripted2 from "pharmacy-layouts/Prescripted";


import Dashboard3 from "lab-layouts/dashboard";
import Tables3 from "lab-layouts/tables";
import AddForm3 from "lab-layouts/AddForm";
import Tests3 from "lab-layouts/Tests";
import EditProfile3 from "lab-layouts/EditProfile";


import Dashboard4 from "doctor-layouts/dashboard";
import Notifications4 from "doctor-layouts/notifications";
import Labs4 from "doctor-layouts/Labs";
import EditProfile4 from "doctor-layouts/EditProfile";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard-patient",
    margin: false,
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Labs",
    key: "labs",
    margin: false,
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/labs-patient",
    component: <Labs />,
  },
  {
    type: "collapse",
    name: "Sample Requests",
    key: "samples",
    margin: true,
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/samples-patient",
    component: <Samples />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "searching",
    margin: true,
    icon: <Icon fontSize="small">Reports</Icon>,
    route: "/searching-patient",
    component: <Reports />,
  },
  {
    type: "collapse",
    name: "Pharmacies",
    key: "pharmacies",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/pharmacies-patient",
    margin: false,
    component: <Pharmacies />,
  },
  {
    type: "collapse",
    name: "Orders",
    margin: true,
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables-patient",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Prescripted Orders",
    margin: true,
    key: "prescripted",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/prescripted-patient",
    component: <Prescripted />,
  },
  {
    type: "collapse",
    name: "Prescriptions",
    margin: true,
    key: "prescriptions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/prescriptions-patient",
    component: <AddForm />,
  },
  {
    type: "collapse",
    name: "Doctors",
    key: "doctors",
    margin: false,
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/doctors-patient",
    component: <Doctors />,
  },
  {
    type: "collapse",
    name: "Appointments",
    key: "appointments",
    margin: true,
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/appointments-patient",
    component: <Appointments />,
  },
  {
    type: "collapse",
    name: "Edit Profile",
    margin: false,
    key: "edit_profile",
    icon: <Icon fontSize="small">Edit</Icon>,
    route: "/edit_profile-patient",
    component: <EditProfile />,
  },
  {
    type: "collapse",
    name: "Cart",
    key: "cart",
    margin: false,
    icon: <Icon fontSize="small">Cart</Icon>,
    route: "/cart-patient",
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
  {
    type: "collapse",
    name: "Verify User",
    margin: false,
    key: "verify-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/verify",
    component: <Verify />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard-pharmacist",
    component: <Dashboard2 />,
  },
  {
    type: "collapse",
    name: "Current Orders",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables-pharmacist",
    component: <Tables2 />,
  },
  {
    type: "collapse",
    name: "Order history",
    margin: false,
    key: "order-history",
    icon: <Icon fontSize="small">Order History</Icon>,
    route: "/order-history-pharmacist",
    component: <History2 />,
  },
  {
    type: "collapse",
    name: "Medicines",
    key: "medicines",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/medicines-pharmacist",
    component: <Pharmacies2 />,
  },
  {
    type: "collapse",
    name: "Add Medcine",
    key: "add_medicines",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/form-pharmacist",
    component: <AddForm2 />,
  },
  {
    type: "collapse",
    name: "Edit Profile",
    key: "edit_profile",
    icon: <Icon fontSize="small">Edit</Icon>,
    route: "/edit_profile-pharmacist",
    component: <EditProfile2 />,
  },
  {
    type: "collapse",
    name: "Prescripted Orders",
    key: "prescripted",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/prescripted-pharmacist",
    component: <Prescripted2 />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard-lab",
    component: <Dashboard3 />,
  },
  {
    type: "collapse",
    name: "Sampling Requests",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables-lab",
    component: <Tables3 />,
  },
  {
    type: "collapse",
    name: "Upload Reports",
    key: "add_medicines",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/form-lab",
    component: <AddForm3 />,
  },
  {
    type: "collapse",
    name: "Add Test",
    key: "add_test",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/test-lab",
    component: <Tests3 />,
  },
  {
    type: "collapse",
    name: "Edit Profile",
    key: "edit_profile",
    icon: <Icon fontSize="small">Edit</Icon>,
    route: "/edit_profile-lab",
    component: <EditProfile3 />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard-doctor",
    margin: false,
    component: <Dashboard4 />,
  },
  {
    type: "collapse",
    name: "Appointments",
    key: "appointments",
    margin: false,
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/appointments-doctor",
    component: <Labs4 />,
  },
  {
    type: "collapse",
    name: "Upload Prescription",
    key: "upload",
    margin: false,
    icon: <Icon fontSize="small">Cart</Icon>,
    route: "/cart-doctor",
    component: <Notifications4 />,
  },
  {
    type: "collapse",
    name: "Edit Profile",
    margin: false,
    key: "edit_profile-doctor",
    icon: <Icon fontSize="small">Edit</Icon>,
    route: "/edit_profile",
    component: <EditProfile4 />,
  },
];


export default routes;
