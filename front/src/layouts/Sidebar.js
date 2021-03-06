import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import logo from "../assets/logo.png";

// sidebar nav config
import navigation from "./_nav";
import navigationAdmin from "./_navAdmin";

const Sidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow.sidebarShow);
  const authenticatedUser = useSelector((state) => state.auth.user);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
      className="c-sidebar-light"
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <img src={logo} class="c-sidebar-brand-full" alt="DigitAct" /> */}
        <span
          style={{
            color: "#1976d2",
            fontSize: "30px",
            fontWeight: 500,
            fontFamily: "monospace",
          }}
        >
          DigitAct
        </span>
      </CSidebarBrand>

      <CSidebarNav>
        <CCreateElement
          items={
            authenticatedUser.role === "ADMIN" ? navigationAdmin : navigation
          }
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(Sidebar);
