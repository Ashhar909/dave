import React from "react";
import { Link } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <div className="d-flex justify-content-end">
      <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link active" to="/sign-in">
                <h4>Login</h4>
                </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/sign-up">
                <h4>Sign Up</h4>
              </Link>
            </li>
        </ul>
    </div>
  );
};


export default SignedOutLinks;