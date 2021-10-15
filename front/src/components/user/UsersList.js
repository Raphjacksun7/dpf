import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Typography,
  Table,
  Input,
  Modal,
  Dropdown,
  Menu,
  List,
  Avatar,
  Space,
} from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AddUser from "./AddUser";
import UserRoles from "./UserRoles";
import AssignedFolders from "./AssignedFolders";

import { getUsers, deleteUser } from "../../actions/user";

import "./styles.scss";

const { Title } = Typography;

const UserList = ({ title }) => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const [isUserRoleModalVisible, setIsUserRoleModalVisible] = useState(false);
  const [isFolderAsssignModalVisible, setIsFolderAsssignModalVisible] =
    useState(false);

  const dataTable = (users) => {
    console.log(users);
    const data = [];
    users.forEach((user) => {
      data.push({
        id: user._id,
        user: {
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
        },
        role: user.role,
        date: moment(user.createdAt).format("LL"),
      });
    });
    //  const data =  users.data.map((user) => {
    //     return {
    //       key: user.id,
    //       user: {
    //         name: `${user.firstname} ${user.lastname}`,
    //         email: user.eamil,
    //       },
    //       role: user.role,
    //       date: user.createdAt,
    //     };
    //   })
    console.log(data);

    return data;
  };

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
    {
      title: "Action",
      key: "action",
      render: (action) => (
        <Dropdown overlay={menu(action.id)} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <MoreOutlined />
          </a>
        </Dropdown>
      ),
    },
  ];

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setAddUserModalVisible(false);
    return values;
  };

  return (
    <>
      <Title level={2}>{title}</Title>
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
          <Title level={4}>Liste des utilisateurs</Title>
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
      {users ? (
        <Table
          columns={columns}
          dataSource={dataTable(users)}
          scroll={{ x: 1000 }}
        />
      ) : (
        <Table columns={columns} dataSource={[]} />
      )}

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

// UserList.propTypes = {
//   users: PropTypes.array.isRequired,
//   getUsers: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   users: state.user.users,
// });

// export default connect(mapStateToProps, { getUsers })(UserList);

export default UserList;
