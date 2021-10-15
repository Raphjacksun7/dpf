import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
} from "@coreui/react";
import logo from "../assets/logo.png";

// routes config
import { routes } from "../routes";

import HeaderDropdown from "./HeaderDropdown";
// import { Redirect, useHistory } from "react-router";

const Header = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const [loggedOut, setLoggedOut] = useState(false);

  const logOutHandle = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setLoggedOut(true);
  };

  if (loggedOut) {
    window.location.reload();
    // return <Redirect to="/login" push={true} />;
    // return  history.push('/login');
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <img src={logo} class="c-sidebar-brand-full" alt="DigitAct" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none ml-auto px-3">
        <HeaderDropdown logout={logOutHandle} />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default Header;
