import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import logo from "../assets/logo.png";

const HeaderDropdown = ({ logout }) => {
  const authenticatedUser = useSelector((state) => state.auth.user);

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={logo} className="c-avatar-img" alt="DigitAct" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>
            {authenticatedUser.firstname + " " + authenticatedUser.lastname}
          </strong>
          <br/>
          <CBadge color="info">{authenticatedUser.role}</CBadge>
        </CDropdownItem>
        <CDropdownItem onClick={logout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Se déconnecter
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default HeaderDropdown;
