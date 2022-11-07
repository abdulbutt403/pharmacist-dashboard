import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Tables from "../../pages/tables";
import History from "../../pages/history";
import Pharmacy from "../../pages/Pharmacy";


// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/pending" component={Typography} />
              <Route path="/app/reports" component={Tables} />
              <Route path="/app/history" component={History} />
              <Route path="/app/pharmacies" component={Pharmacy} />
              <Route path="/app/cart" component={Notifications} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
