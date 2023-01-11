import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions/authAct";
import { Link, useNavigate } from "react-router-dom";
import { showAlert } from "../../store/actions/alertAct";

const Login = (props) => {
  let Navigate = useNavigate();
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.authenticate(creds);
    if (localStorage.getItem("token")) {
      props.showAlert("Logged In succesfully", "success");
      Navigate("/home");
    } else if(localStorage.getItem("auth-error")) {
      props.showAlert(localStorage.getItem("auth-error"),"error");
    }
    else{
      props.showAlert("Internal server error","error");
    }
  };
  return (
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              value={creds.email}
              name="email"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              value={creds.password}
              name="password"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>

          <p className="forgot-password text-center">
            Not registered <Link to="/sign-up">sign up?</Link>
          </p>
        </form>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authstat: state.auth,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    authenticate: (creds) => dispatch(login(creds)),
    showAlert: (msg, status) => dispatch(showAlert(msg,status))
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(Login);
