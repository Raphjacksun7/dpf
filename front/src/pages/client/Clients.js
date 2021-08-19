import React, { useEffect, useState } from 'react';
import { Row, Col, Button,Typography,Table, Input ,Modal, Dropdown , Menu, List, Avatar,Space} from 'antd';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
  getClients,
  deleteClient
} from "../../actions/client";
import AddClient from "./AddClient"
import "./styles.scss"


const { Title } = Typography;

const menu = (
  <Menu>
    <Menu.Item key="0">
      Voir
    </Menu.Item>
    <Menu.Item key="1">
      Modifier
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2" danger>Supprimer</Menu.Item>
  </Menu>
);

const columns = [
  {
    title: `Nom du client`,
    dataIndex: 'user',
    key: 'user',
    render: (user) => {
      console.log(user)
      return ( 
      <List.Item>
      <List.Item.Meta
        avatar={<Avatar size="large">
        {user.name
          .match(/\b(\w)/g)
          .join("")
          .toUpperCase()}
      </Avatar>}
        title={user.name}
        description={`Mise à jour le ${moment(user.updatedAt).format("LL")}`}
      />
    </List.Item>
      )
    },
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


const Clients = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const clients = useSelector((state) => state.client.clients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, []);


  const dataTable = (clients) => {
    console.log(clients);
    const data = [];
    clients.forEach((client) => {
      data.push({
        id: client._id,
        user: {
          name: `${client.firstname} ${client.lastname}`,
        },
        date: moment(client.createdAt).format("LL"),
      });
    });
    console.log(data);

    return data;
  };


  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setIsModalVisible(false);
    return values;
  };

  return (
    <>
     <Title level={2}>Clients</Title>
     <Row className="add-new">
        <Button className="d_btn_primary" type="primary" size="large" onClick={showModal}>
            Ajouter un client
        </Button>
        <AddClient
          centered
          visible={isModalVisible}
          width={700}
          onCreate={onCreate}
          onCancel={() => {
            setIsModalVisible(false);
          }}
        />
      </Row>
      <Row>
        <Col span={8}>
        <Title level={4}>Liste des clients</Title>
        </Col>
        <Col span={8} offset={8}>
        <div className="space-align-block">
          <Space size="large" align="baseline">
            <Input placeholder="Rechercher" prefix={<SearchOutlined />} />
          </Space>
        </div>
        </Col>
      </Row>
      {clients ? (
        <Table
          columns={columns}
          dataSource={dataTable(clients)}
          scroll={{ x: 1000 }}
        />
      ) : (
        <Table columns={columns} dataSource={[]} />
      )}

   </>
  )
}


export default Clients;


