import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Table,
  Input,
  List,
  Avatar,
  Space,
  Tooltip,
  Empty,
  Skeleton,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import documentImg from "../../assets/document.png";
import { getUser } from "../../actions/user";
// import "./styles/document.scss";
import moment from "moment";
import { getFolders } from "../../actions/folder";

export default function Archive() {
  const auth = useSelector((state) => state.auth.user);
  const folders = useSelector((state) => state.folder.folders);
  const [folderFilter, setFolderFilter] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFolders());
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
              description={`Créer le ${document.createdAt}`}
            />
          </List.Item>
        );
      },
    },
    {
      title: "Était affecté à",
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
      title: "Archivé le",
      dataIndex: "archived_on",
      key: "archived_on",
    },
  ];

  return (
    <>
      <Typography.Title level={2}>Archives</Typography.Title>

      <Row>
        <Col span={8}>
          <Typography.Title level={4}>
            Liste des dossiers archivés
          </Typography.Title>
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
      {folders.lenght !== 0 ? (
        <Table
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                imageStyle={{
                  height: 60,
                }}
                description={<span>Aucun résultat</span>}
              ></Empty>
            ),
          }}
          columns={columns}
          dataSource={folders
            .map(
              (folder) =>
                folder.is_archived === true && {
                  id: folder._id,
                  document: {
                    name: folder.name,
                    createdAt: moment(folder.createdAt).format("LL"),
                  },
                  ressource: folder.users,
                  archived_on: moment(folder.updatedAt).format("LL"),
                }
            )
            .filter(
              (item) =>
                item &&
                (item.document.name
                  .toLowerCase()
                  .indexOf(folderFilter.toLowerCase()) !== -1 ||
                  item.archived_on
                    .toLowerCase()
                    .indexOf(folderFilter.toLowerCase()) !== -1 ||
                  item.document.createdAt
                    .toLowerCase()
                    .indexOf(folderFilter.toLowerCase()) !== -1)
            )
            // To sort the array data by the last element created
            .sort((a, b) => new Date(b.archived_on) - new Date(a.archived_on))}
          scroll={{ x: 800 }}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={[]}
          locale={{
            emptyText: <Skeleton />,
          }}
        />
      )}
    </>
  );
}
