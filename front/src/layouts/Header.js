import React from 'react'
import {useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CContainer
} from '@coreui/react'
import logo from "../assets/logo.png";
import { Avatar , Menu, Dropdown, Row, Col, Divider, Badge } from 'antd';
import { BellFilled } from '@ant-design/icons';

const { SubMenu } = Menu


const Header = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const ToggleMenu = () => {
    let match = !useRouteMatch("/dashboard");
    if (match){
      return( <>
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
        </>)
    }
    return (
      <CHeaderBrand className="d-md-down-none" to="/">
        <img src={logo} class="c-sidebar-brand-full"/>
        {/* <img src={logo} class="c-sidebar-brand-minimized"/> */}
      </CHeaderBrand>
    )
  }



  return (
    <CContainer>
      <CHeader style={{ paddingTop: 10}}>
          {/* <ToggleMenu/> */}
          <CHeaderBrand className="mx-auto d-lg-none" to="/">
            <img src={logo} className="c-sidebar-brand-full"/>
          </CHeaderBrand>
          <Menu   mode="horizontal">
            <SubMenu title={
              <>
                <Badge dot>
                  <BellFilled />
                </Badge>
              </>
            }>
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Divider type="vertical" />
            <SubMenu title={
               <>
               <span className="username">Jones Ferdinand</span>
               <Avatar size="large">JF</Avatar>
             </>
            }>
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:3">Option 1</Menu.Item>
                <Menu.Item key="setting:4">Option 2</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
      </CHeader>


    </CContainer>
  )
}

export default Header


