import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Typography,
  Table,
  Input,
  Tag,
  List,
  Avatar,
  Space,
  Tooltip,
  Empty,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AddDocument from "../../components/document/AddDocument";
import { useDispatch, useSelector } from "react-redux";
import documentImg from "../../assets/document.png";
import { getUser } from "../../actions/user";
import tagColor from "../../helpers/tagColor";
import "./styles/document.scss";
import moment from "moment";

const UserDocuments = ({ title, role }) => {
  const auth = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.user.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folderFilter, setFolderFilter] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUser(auth.sub));
  }, []);

  const columns = [
    {
      title: "Nom du dossier",
      dataIndex: "document",
      key: "document",
      render: (document) => {
        return (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={documentImg} />}
              title={document.name}
              description={`Mis à jour le ${document.updatedAt}`}
            />
          </List.Item>
        );
      },
    },
    {
      title: "Ressources",
      dataIndex: "ressource",
      key: "ressource",
      render: (ressource) => {
        return (
          <Avatar.Group
            maxCount={2}
            size={32}
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            {ressource.map((src) => {
              console.log(src);
              return (
                <Tooltip title={`${src.firstname}  ${src.lastname}`}>
                  <Avatar size={32}>
                    {`${src.firstname}  ${src.lastname}`
                      .match(/\b(\w)/g)
                      .join("")
                      .toUpperCase()}
                  </Avatar>
                </Tooltip>
              );
            })}
          </Avatar.Group>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Etat",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <>
          {status.isCancelled ? (
            <>
              <Tag className="tag-cancel">ANNULÉ</Tag>
            </>
          ) : (
            <Tag className={tagColor(status.state)} key={status.state}>
              {status.state.toUpperCase()}
            </Tag>
          )}
        </>
      ),
    },
  ];

  const dataTable = (folders) => {
    if (folders) {
      const data = [];
      folders.forEach((folder) => {
        data.push({
          id: folder._id,
          document: {
            name: folder.name,
            updatedAt: moment(folder.updatedAt).format("LL"),
          },
          ressource: folder.users,
          date: moment(folder.createdAt).format("LL"),
          status: folder.status,
        });
      });
      return data;
    }

    return [];
  };

  const onCreate = () => {
    console.log("After form validate");
    setIsModalVisible(false);
    dispatch(getUser());
    return "OK";
  };

  return (
    <>
      <Typography.Title level={2}>Vos Dossiers</Typography.Title>
      {role === "admin" ? (
        <Row className="add-new">
          <Button
            className="d_btn_primary"
            type="primary"
            size="large"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Nouveau dossier
          </Button>
          <AddDocument
            visible={isModalVisible}
            width={600}
            onCreate={onCreate}
            onCancel={() => {
              setIsModalVisible(false);
            }}
          />
        </Row>
      ) : null}
      <Row>
        <Col span={8}>
          <Typography.Title level={4}>Liste des dossiers</Typography.Title>
        </Col>
        <Col span={8} offset={8}>
          <div className="space-align-block">
            <Space size="large" align="baseline">
              <Input
                placeholder="Rechercher"
                prefix={<SearchOutlined />}
                style={{
                  height: "40px",
                  lineHeight: "30px",
                  borderColor: "#8E8E93",
                }}
                value={folderFilter}
                onChange={(e) => setFolderFilter(e.target.value.toLowerCase())}
              />
            </Space>
          </div>
        </Col>
      </Row>
      {user ? (
        <Table
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                imageStyle={{
                  height: 60,
                }}
                description={<span>Aucun résultat trouvé</span>}
              ></Empty>
            ),
          }}
          columns={columns}
          dataSource={dataTable(user.assignedFolder)
            .filter((item) => {
              return (
                item.document.name
                  .toLowerCase()
                  .indexOf(folderFilter.toLowerCase()) !== -1 ||
                item.date.toLowerCase().indexOf(folderFilter.toLowerCase()) !==
                  -1 ||
                item.document.updatedAt
                  .toLowerCase()
                  .indexOf(folderFilter.toLowerCase()) !== -1
              );
            })
            // To sort the array data by the last element created
            .sort((a, b) => new Date(b.date) - new Date(a.date))}
          scroll={{ x: 800 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                history.push(`/document/${record.id}`);
              },
            };
          }}
        />
      ) : (
        <Table columns={columns} dataSource={[]} />
      )}
    </>
  );
};

export default UserDocuments;
