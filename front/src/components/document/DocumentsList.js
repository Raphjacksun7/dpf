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
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AddDocument from "./AddDocument";
import { useDispatch, useSelector } from "react-redux";
import documentImg from "../../assets/document.png";
import { getFolders } from "../../actions/folder";
import tagColor from "../../helpers/tagColor";
import "./styles.scss";
import moment from "moment";

const { Title } = Typography;

const DocumentsList = ({ title }) => {
  const authenticateUser = useSelector((state) => state.auth.user);
  const folders = useSelector((state) => state.folder.folders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folderFilter, setFolderFilter] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getFolders());
  }, [dispatch]);

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

  const onCreate = () => {
    console.log("After form validate");
    setIsModalVisible(false);
    dispatch(getFolders());
    return "OK";
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

      <Row>
        <Col span={8}>
          <Title level={4}>Liste des dossiers</Title>
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

      <Table
        className="table-dgt"
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
        dataSource={
          folders
            ? folders
                .map((folder) => {
                  return {
                    id: folder._id,
                    document: {
                      name: folder.name,
                      updatedAt: moment(folder.updatedAt).format("LL"),
                    },
                    ressource: folder.users,
                    date: moment(folder.createdAt).format("LL"),
                    status: {
                      state: folder.status,
                      isCancelled: folder.isCancelled,
                    },
                  };
                })
                .filter((item) => {
                  return (
                    item.document.name
                      .toLowerCase()
                      .indexOf(folderFilter.toLowerCase()) !== -1 ||
                    item.date
                      .toLowerCase()
                      .indexOf(folderFilter.toLowerCase()) !== -1 ||
                    item.document.updatedAt
                      .toLowerCase()
                      .indexOf(folderFilter.toLowerCase()) !== -1
                  );
                })
            : []
        }
        scroll={{ x: 800 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              authenticateUser.role === "ADMIN" ? (
                history.push(`/document/${record.id}`)
              ) : (
                <>
                  {message.error(
                    "Vous devez être administrateur pour accéder à un dossier annulé"
                  )}
                </>
              );
            },
          };
        }}
        rowClassName={(record) => record.status.isCancelled && "disabled-row"}
      />
    </>
  );
};

export default DocumentsList;
