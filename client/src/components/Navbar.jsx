import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
const Navbar = () => {
  const isLogged = () => {
    let role = localStorage.getItem("role");
    let status = localStorage.getItem("status");
    role = JSON.parse(role);
    if (role && status) {
      if (role === "Admin") {
        return (
          <Fragment>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-danger">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sparepart" className="nav-link text-info">
                Sparepart Table Data
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/employee-acceptance" className="nav-link text-success">
                Employee Registrations
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={() => {
                  window.location.assign("/login");
                  localStorage.clear();
                }}
                to="/login"
                className="nav-link"
              >
                Logout
              </Link>
            </li>
          </Fragment>
        );
      } else if (role === "Employee") {
        return (
          <Fragment>
            <li>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={() => {
                  window.location.assign("/login");
                  localStorage.clear();
                }}
                to="/login"
                className="nav-link"
              >
                Logout
              </Link>
            </li>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <li>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/issue-list" className="nav-link">
                My Issues
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={() => {
                  window.location.assign("/login");
                  localStorage.clear();
                }}
                to="/login"
                className="nav-link"
              >
                Logout
              </Link>
            </li>
          </Fragment>
        );
      }
    } else {
      return (
        <Fragment>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
        </Fragment>
      );
    }
  };
  return (
    <Fragment>
      <nav className="navbar navbar-expand navbar-dark bg-dark text-light" style={{height: "40px"}}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <span className="nav-link" id="kr-nav">
              <FaFacebookF />
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link" id="kr-nav">
              <FaTwitter />
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link" id="kr-nav">
              <FaLinkedinIn />
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link" id="kr-nav">
              <FaInstagram />
            </span>
          </li>
        </ul>
        <div className="col-md-11 d-flex justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link" id="kr-nav">
                + 666 666 666
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" id="kr-nav">
                kryptonforce@gmail.com
              </span>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <Link to="/" id="nav-title" className="nav-link text-dark">
            krypto<span className="text-danger">force</span>
          </Link>
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul
            className="navbar-nav mr-auto mt-2 mt-lg-0"
            style={{ marginLeft: "77%" }}
          >
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {isLogged()}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
