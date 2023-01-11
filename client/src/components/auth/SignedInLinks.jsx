import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authAct";
import { showAlert } from "../../store/actions/alertAct";

const SignedInLinks = (props) => {
  const Navigate = useNavigate();
  const handleClick = () => {
    props.logout();
    props.showAlert("Signed Out succesfully", "success");
    Navigate("/");
  };

  return (
    <div>
      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <div className="navbar-nav mr-auto">
          <div className="nav-item">
            <Link className="nav-link active" to="/home">
              <h4>Home</h4>
            </Link>
          </div>
          <div>
            <Link
              className="nav-link active"
              onClick={handleClick}
              to="/sign-in"
            >
              <h4 style={{ marginLeft: "20px" }}>Logout</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    grp: state.grp,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    showAlert: (msg, status) => dispatch(showAlert(msg, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(SignedInLinks);
