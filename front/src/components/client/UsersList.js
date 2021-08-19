import React, { useState } from 'react';
import {
  CRow,
} from '@coreui/react'

import { Row, Col, Button,Typography,Table, Input ,Modal, Dropdown , Menu, List, Avatar,Space} from 'antd';
import { FilterFilled, MoreOutlined, SearchOutlined } from '@ant-design/icons';
import AddUser from "./AddUser"
import "./styles.scss"


const { Title } = Typography;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">Assigner un dossier</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#">Modifier cet utilisateur</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Supprimer</Menu.Item>
  </Menu>
);

const columns = [
  {
    title: `Nom de l'utilisateur`,
    dataIndex: 'user',
    key: 'user',
    render: (user) => {
      console.log(user)
      return ( 
      <List.Item>
      <List.Item.Meta
        avatar={<Avatar size="large">JF</Avatar>}
        title={user.name}
        description={user.mail}
      />
    </List.Item>
      )
    },
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <MoreOutlined />
        </a>
      </Dropdown>
    ),
  },
];

const data = [
  {
    key: '1',
    user: {name:"Tom Cruise",mail:"tom.cruise@gmail.com"},
    role: 'Gestionnaire',
    date: 'May 29, 2019',
  },
  {
    key: '2',
    user: {name:"Maurice Evans",mail:"maurice102@gmail.com"},
    role: 'Gestionnaire',
    date: 'May 29, 2019',
  },  
  {
    key: '3',
    user: {name:"Chris Cesar",mail:"chris.cesar@gmail.com"},
    role: 'Admin',
    date: 'May 29, 2019',
  },
];

const UserList = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
     <Title level={2}>Administration</Title>
     <CRow className="add-new">
        <Button className="d_btn_primary" type="primary" size="large" onClick={showModal}>
            Ajouter un membre
        </Button>
        <Modal centered closable="false" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Valider" cancelText="Retour">
          <AddUser/>
        </Modal>
      </CRow>
      <Row>
        <Col span={8}>
        <Title level={4}>Liste des utilisateurs</Title>
        </Col>
        <Col span={8} offset={8}>
        <div className="space-align-block">
          <Space size="large" align="baseline">
            <Input placeholder="Rechercher" prefix={<SearchOutlined />} />
            <Button icon={<FilterFilled />}>Filtrer</Button>
          </Space>
        </div>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />

   </>
  )
}

export default UserList





