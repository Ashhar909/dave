import React, { useState } from "react";
import { connect } from "react-redux";
import { createUser } from "../../store/actions/authAct";
import { Link, useNavigate } from "react-router-dom";
import { showAlert } from "../../store/actions/alertAct";

const Signup = (props) => {
  let Navigate = useNavigate();
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
    phone:""
  });

  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.createAccount(creds);
    if (localStorage.getItem("token")) {
      props.showAlert("Signed up succesfully", "success");
      Navigate("/home");
    } else {
      props.showAlert(localStorage.getItem("auth-error"), "danger");
    }
  };
  return (
    <div className="auth-inner">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={creds.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={creds.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={creds.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="8830100999"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={creds.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Verify Phone
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <Link to="/sign-in">sign in?</Link>
        </p>
        
      </form>
    </div>
  );
};

const mapDispatchToprops = (dispatch) => {
  return {
    createAccount: (creds) => dispatch(createUser(creds)),
    showAlert: (msg, status) => dispatch(showAlert(msg, status)),
  };
};

export default connect(null, mapDispatchToprops)(Signup);
