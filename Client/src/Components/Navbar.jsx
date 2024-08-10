import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Css/Navbar.css";
import { useSelector } from "react-redux";

const Navbar = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLabDropdown, setShowLabDropdown] = useState(false);
  const [showLabDataDropdown, setShowDataDropdown] = useState(false);
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setShowDropdown(false);
    setShowLabDropdown(false);
    setShowDataDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleLabDropdown = () => {
    setShowLabDropdown(!showLabDropdown);
  };

  const toggleLabDataDropdown = () => {
    setShowDataDropdown(!showLabDataDropdown);
  };

  const hideDropdowns = () => {
    setShowDropdown(false);
    setShowLabDropdown(false);
    setShowDataDropdown(false);
  };

  return (
    <Fragment>
      <nav className="navbar-container">
        <div className="logo-container">
          <Link to="/">
            {/* <img src="logoMaha.png" alt="Your Logo" className="logo" /> */}
            <h4
              style={{
                fontFamily: "Poppins",
                fontSize: "2rem",
                margin: "1rem",
                color:'whitesmoke'
              }}
            >
              MahaGenco
            </h4>
          </Link>
        </div>
        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <ul style={{ gap: "8rem" }}>
            <li className={location.pathname === "/chp-entry" ? "active" : ""}>
              <Link onClick={toggleMenu} to="/chp-entry">
                CHP Entry
              </Link>
            </li>
            <li onClick={toggleDropdown}>
              <Link onClick={toggleMenu}>All Data</Link>
              {showDropdown && (
                <ul className="dropdown-menus">
                  {isAuthenticated && (
                    <>
                      <li>
                        <Link to="/data/raw-coal" onClick={hideDropdowns}>
                          Raw Coal
                        </Link>
                      </li>
                      <li>
                        <Link to="/data/washed-coal" onClick={hideDropdowns}>
                          Washed Coal
                        </Link>
                      </li>
                      <li>
                        <Link to="/data/imported-coal" onClick={hideDropdowns}>
                          Imported Coal
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </li>
            <li onClick={toggleLabDropdown}>
              <Link onClick={toggleMenu}>Lab Entry</Link>
              {showLabDropdown && (
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/lab-entry/unloading-end-tps"
                      onClick={hideDropdowns}
                    >
                      unloading End Tps
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lab-entry/unloading-end-tpsa-iia"
                      onClick={hideDropdowns}
                    >
                      Unloading End Third Party
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lab-entry/loading-end-tpsa-iia"
                      onClick={hideDropdowns}
                    >
                      Unloading End Referee
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lab-entry/unloading-end-tps-referee"
                      onClick={hideDropdowns}
                    >
                      Loading End Third Party
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lab-entry/loading-end-tps-referee"
                      onClick={hideDropdowns}
                    >
                      Loading End Referee
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li onClick={toggleLabDataDropdown}>
              <Link onClick={toggleMenu}>Lab Data</Link>
              {showLabDataDropdown && (
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/lab-entry/unloading-end-tps-data"
                      onClick={hideDropdowns}
                    >
                      unloading End Tps Data
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lab-entry/unloading-end-tpsa-iia-data"
                      onClick={hideDropdowns}
                    >
                      Unloading End Third Party Data
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lab-entry/loading-end-tpsa-iia-data"
                      onClick={hideDropdowns}
                    >
                      Unloading End Referee Data
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lab-entry/unloading-end-tps-referee-data"
                      onClick={hideDropdowns}
                    >
                      Loading End Third Party Data
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lab-entry/loading-end-tps-referee-data"
                      onClick={hideDropdowns}
                    >
                      Loading End Referee Data
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li
              className={
                location.pathname === "/report/proforma06" ? "active" : ""
              }
            >
              <Link to="/report/proforma06" onClick={toggleMenu}>
                ProForma06
              </Link>
            </li>

            {isAuthenticated && (
              <li className={location.pathname === "/profile" ? "active" : ""}>
                <Link onClick={toggleMenu} to="/profile">
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
