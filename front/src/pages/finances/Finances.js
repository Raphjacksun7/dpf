import React from 'react'
import { 
  Row, 
  Col, 
  Button,
  Typography,
  Table, 
  Input ,
  Tag, 
  Dropdown , 
  Menu, 
  List, 
  Avatar,
  Space,
  Select
} from 'antd';
import { FilterFilled, EyeTwoTone, SearchOutlined } from '@ant-design/icons';
import documentImg from "../../assets/document.png"
import "./Finances.scss"

const { Option } = Select;
const { Title } = Typography;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">Voir</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#">Modifier</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Supprimer</Menu.Item>
  </Menu>
);

const columns = [
  {
    title: 'Nom du dossier',
    dataIndex: 'name',
    key: 'name',
    render: text => {
      return ( 
      <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={documentImg} />}
        title={text}
        description="Mise à jour il y’a  1 jour"
      />
    </List.Item>
      )
    },
  },
  {
    title: 'Gestionnaire',
    dataIndex: 'manager',
    key: 'manager',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Etat',
    key: 'state',
    dataIndex: 'state',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={"volcano"} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <a>
        <EyeTwoTone />
      </a>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'GBO_KAT_2005',
    manager: "Tom Cruise",
    date: 'May 29, 2019',
    state: ['Validation 1'],
  },
  {
    key: '2',
    name: 'MAU_EUN_1053',
    manager: "Tom Cruise",
    date: 'May 27, 2019',
    state: ['Validation 2'],
  },
  {
    key: '3',
    name: 'ACO_SON_8053',
    manager: "Tom Cruise",
    date: 'May 26, 2019',
    state: ['Validation Remise'],
  },
];

const Finances = () => {

  return (
    <>
     <Title level={2}>Finances</Title>
      <Row>
        <Col span={8}>
        <Select
          showSearch
          style={{ width: "100%" }}
          defaultValue="jack"
          optionFilterProp="children"
          bordered={false}
        >
          <Option value="jack">Tout les dossiers en attentes</Option>
          <Option value="lucy">Dossiers validés</Option>
          <Option value="lola">Dossiers en V1</Option>
          <Option value="tata">Dossiers en V2</Option>
          <Option value="toti">Dossiers en Validation de Remise</Option>
        </Select>
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

export default Finances





