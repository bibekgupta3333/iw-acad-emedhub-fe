import React from "react";
import { connect } from "react-redux";

const Alert = (props) => {
  const { alerts } = props;
  if (alerts !== null && alerts.length > 0) {
    let alertsList;
    alertsList = alerts.map((alert) => {
      return (
        <div
          key={alert.id}
          className={`alert alert-${alert.alertType} bg-${alert.alertType} alert-dismissible fade show border border-primary m-0 text-center text-light font-weight-bold`}
          role="alert"
        >
          {alert.alertType === "danger" ? "Error: " : ""} {alert.msg}
        </div>
      );
    });
    return alertsList;
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, null)(Alert);
