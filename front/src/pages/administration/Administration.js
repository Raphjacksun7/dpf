import React, { useEffect, useState } from "react";
import {
  Empty,
  Row,
  Col,
  Button,
  Typography,
  Table,
  Input,
  Modal,
  Menu,
  List,
  Avatar,
  Space,
  Skeleton,
} from "antd";
import {
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AddUser from "./AddUser";
import UserRoles from "../../components/user/UserRoles";
import AssignedFolders from "../../components/user/AssignedFolders";

import { getUsers, deleteUser } from "../../actions/user";

import "./styles.scss";
import { useHistory } from "react-router";

const Administration = () => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const [isUserRoleModalVisible, setIsUserRoleModalVisible] = useState(false);
  const [isFolderAsssignModalVisible, setIsFolderAsssignModalVisible] =
    useState(false);

 
  const userRoleModal = () => {
    setIsUserRoleModalVisible(true);
  };

  const onRoleBtn = () => {
    setIsUserRoleModalVisible(false);
  };

  const onCancelRoleBtn = () => {
    setIsUserRoleModalVisible(false);
  };

  const assignedFoldersModal = () => {
    setIsFolderAsssignModalVisible(true);
  };

  const onAssignBtn = () => {
    setIsFolderAsssignModalVisible(false);
  };

  const onCancelAssignBtn = () => {
    setIsFolderAsssignModalVisible(false);
  };

  const onDeleteUser = (id) => {
    Modal.confirm({
      title: "Vous êtes sûr de vouloir supprimer ce utilisateur ?",
      icon: <ExclamationCircleOutlined />,
      content: "Veillez notez que cette action est irréversible",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk() {
        dispatch(deleteUser(id))
          .then((response) => {
            console.log(response);
            // refreshData();
          })
          .catch((e) => {
            console.log(e);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const menu = (id) => {
    return (
      <Menu>
        <Menu.Item onClick={userRoleModal}>Rôles</Menu.Item>
        <Menu.Item onClick={assignedFoldersModal}>Dossiers assignés</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          danger
          // onClick={onDeleteUser(id)}
        >
          Supprimer
        </Menu.Item>
      </Menu>
    );
  };
  const columns = [
    {
      title: `Nom de l'utilisateur`,
      dataIndex: "user",
      key: "user",
      render: (user) => {
        return (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar size="large">
                  {user.name
                    .match(/\b(\w)/g)
                    .join("")
                    .toUpperCase()}
                </Avatar>
              }
              title={user.name}
              description={user.email}
            />
          </List.Item>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setAddUserModalVisible(false);
    return values;
  };

  return (
    <>
      <Typography.Title level={2}>Administration</Typography.Title>
      <Row className="add-new">
        <Button
          className="d_btn_primary"
          type="primary"
          size="large"
          onClick={() => {
            setAddUserModalVisible(true);
          }}
        >
          Ajouter un utilisateur
        </Button>
        <AddUser
          centered
          visible={isAddUserModalVisible}
          width={700}
          onCreate={onCreate}
          onCancel={() => {
            setAddUserModalVisible(false);
          }}
        />
      </Row>
      <Row>
        <Col span={8}>
          <Typography.Title level={4}>Liste des utilisateurs</Typography.Title>
        </Col>
        <Col span={8} offset={8}>
          <div className="space-align-block">
            <Space size="large" align="baseline">
              <Input placeholder="Rechercher" prefix={<SearchOutlined />} />
              {/* <Button icon={<FilterFilled />}>Filtrer</Button> */}
            </Space>
          </div>
        </Col>
      </Row>
      <Table
        columns={columns}
        locale={{
          emptyText: users ? <Skeleton active={true} /> : <Empty />,
        }}
        dataSource={
          users
            ? users.map((user) => {
                return {
                  id: user._id,
                  user: {
                    name: `${user.firstname} ${user.lastname}`,
                    email: user.email,
                  },
                  role: user.role,
                  date: moment(user.createdAt).format("LL"),
                };
              })
            : []
        }
        scroll={{ x: 700 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              history.push(`/user/${record.id}`);
            },
          };
        }}
      />

      <Modal
        centered
        visible={isUserRoleModalVisible}
        width={600}
        onOk={onRoleBtn}
        onCancel={onCancelRoleBtn}
        okText="Valider"
        cancelText="Retour"
      >
        <UserRoles />
      </Modal>
      <Modal
        centered
        visible={isFolderAsssignModalVisible}
        width={600}
        onOk={onAssignBtn}
        onCancel={onCancelAssignBtn}
        okText="Valider"
        cancelText="Retour"
      >
        <AssignedFolders />
      </Modal>
    </>
  );
};

export default Administration;
