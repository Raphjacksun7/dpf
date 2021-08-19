import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Menu,
  Dropdown,
  Typography,
  Table,
  Input,
  Tabs,
  List,
  Avatar,
  Modal,
  Space,
  Tooltip,
  Tag,
  Spin,
} from "antd";
import { CBadge } from "@coreui/react";
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
import documentEdit20Regular from "@iconify/icons-fluent/document-edit-20-regular";
import arrowBackOutline from "@iconify/icons-eva/arrow-back-outline";
import overflowMenuVertical from "@iconify/icons-carbon/overflow-menu-vertical";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import documentImg from "../../assets/document.png";
import UploadActe from "./UploadActe";
import Option from "./Option";
import { getFolder, deleteFolder } from "../../actions/folder";
import { getActes } from "../../actions/acte";
import { getDModelsByFolder } from "../../actions/d-model";
import { getActesByFolder } from "../../actions/acte";
import dataURItoBlob from "../../helpers/toBlob";
import "./styles.scss";

const { TabPane } = Tabs;

const acte_columns = [
  {
    title: "Nom de l'acte",
    dataIndex: "document",
    key: "document",
    render: (document) => {
      return (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={documentImg} />}
            title={document.name}
            description={document.update_at}
          />
        </List.Item>
      );
    },
  },
  {
    title: "Mise à jour",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Attachement",
    key: "attachement",
    render: () => (
      <Button className="d_btn_third ">
        <Icon
          icon={documentEdit20Regular}
          style={{ color: "#1976d2", fontSize: "20px", marginRight: "8px" }}
        />
        Remplacer
      </Button>
    ),
  },
];

const modele_columns = [
  {
    title: "Nom du modèle",
    dataIndex: "document",
    key: "document",
    render: (document) => {
      console.log(document);
      return (
        <List.Item className="modele-list">
          <List.Item.Meta
            avatar={<Avatar src={documentImg} />}
            title={
              <span>
                {document.name}{" "}
                <Tag
                  style={
                    document.modelType === "ACTE"
                      ? { backgroundColor: "#009688" }
                      : { backgroundColor: "#ffc107" }
                  }
                >
                  {document.modelType}
                </Tag>
              </span>
            }
            description={document.updatedAt}
          />
        </List.Item>
      );
    },
  },
  {
    title: "Mise à jour",
    dataIndex: "date",
    key: "date",
  },
];

const DocumentDetails = () => {
  const { id } = useParams();
  const folder = useSelector((state) => state.folder.folder);
  const actes = useSelector((state) => state.acte.folderActes);
  const dModels = useSelector((state) => state.dModel.folderDModels);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getFolder(id));
    dispatch(getDModelsByFolder(id));
    dispatch(getActesByFolder(id));
  }, []);

  const [acteModal, setActeModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const onActeModalCreate = () => {
    console.log("After form validate");
    setActeModalVisible(false);
    dispatch(getActes());
    return "OK";
  };

  const onDeleteFolder = () => {
    Modal.confirm({
      title: "Vous êtes sûr de vouloir annuler ce dossier ?",
      icon: <ExclamationCircleOutlined />,
      content: "Veillez notez que cette action est irréversible",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk() {
        dispatch(deleteFolder(id))
          .then((response) => {
            console.log(response);
            history.goBack();
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

  const loadModel = () => {};

  const cancelMenu = (
    <Menu>
      <Menu.ItemGroup key="g1" title="Paramètres du dossier">
        <Menu.Item key="0">Voir les ressources </Menu.Item>
        <Menu.Item key="1">Voir les clients</Menu.Item>
        <Menu.Item key="2" danger onClick={onDeleteFolder}>
          Annuler le dossier
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <>
      <div className="block">
        <div className="title">
          <Icon icon={arrowBackOutline} onClick={() => history.goBack()} />
          <Typography.Title level={2}>{folder.name}</Typography.Title>
          <CBadge color="danger"> {folder.status}</CBadge>
          <Tooltip title=" Voir les paramètres de ce dossier">
            <Dropdown overlay={cancelMenu} trigger={["click"]}>
              <Icon
                icon={overflowMenuVertical}
                onClick={(e) => e.preventDefault()}
              />
            </Dropdown>
          </Tooltip>
        </div>
        <Typography.Title level={4} className="subtitle">
          {actes.length > 0
            ? [
                actes.length === 1
                  ? actes.length + " acte est lié à ce dossier"
                  : actes.length + " actes sont liés à ce dossier",
              ]
            : "Aucun acte n'est lié à ce dossier"}
          {/* <Tooltip title=" Annuler ce dossier">
            <Icon icon={cancelCircle} onClick={onDeleteFolder} />
          </Tooltip> */}
        </Typography.Title>
      </div>
      <Tabs defaultActiveKey="1" size="middle" centered>
        <TabPane tab="Modèles" key="1">
          <Row>
            <Col span={8}>
              <Typography.Title level={4}>Liste de vos modéles</Typography.Title>
            </Col>
            <Col span={10} offset={6}>
              <div className="space-align-block">
                <Space size="large" align="baseline">
                  <Input
                    placeholder="Rechercher"
                    prefix={<SearchOutlined />}
                    style={{
                      height: "42px",
                      lineHeight: "30px",
                      borderColor: "#8E8E93",
                    }}
                  />
                  <Button
                    className="d_btn_primary"
                    type="primary"
                    onClick={() => setIsModalVisible(true)}
                  >
                    Générer un modélé
                  </Button>
                  <Modal
                    className="hideFooter"
                    centered
                    visible={isModalVisible2}
                    onCancel={() => setIsModalVisible(false)}
                    width={700}
                  >
                    <Option />
                  </Modal>
                </Space>
              </div>
            </Col>
          </Row>
          {dModels ? (
            <Spin
              className="quizz-spin"
              indicator={<LoadingOutlined />}
              spinning={confirmLoading}
              tip="Ouverture du modèle..."
            >
              <Table
                columns={modele_columns}
                dataSource={dModels.map((model) => {
                  return {
                    id: model._id,
                    document: {
                      name: model.name,
                      updatedAt: moment(model.updatedAt).format("LL"),
                      modelType: model.modelType,
                    },
                    fileURI: model.fileURI,
                    date: moment(model.createdAt).format("LL"),
                  };
                })}
                scroll={{ x: 1000 }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      console.log(record);
                      setConfirmLoading(true);
                      var request = new XMLHttpRequest();
                      request.open("GET", record.fileURI, true);
                      request.responseType = "blob";
                      request.onload = function () {
                        var reader = new FileReader();
                        reader.readAsDataURL(request.response);
                        reader.onload = function (e) {
                          setConfirmLoading(false);
                          // console.log("DataURL:", e.target.result);
                          console.log(dataURItoBlob(e.target.result));
                          history.push(`/editor/edit/${record.id}`, {
                            data: dataURItoBlob(e.target.result),
                          });
                        };
                      };
                      request.send();
                    },
                  };
                }}
              />
            </Spin>
          ) : (
            <Table columns={modele_columns} dataSource={[]} />
          )}
        </TabPane>

        <TabPane tab="Actes signés" key="3">
          <Row>
            <Col span={8}>
              <Typography.Title level={4}>Liste des actes signés</Typography.Title>
            </Col>
            <Col span={10} offset={6}>
              <div className="space-align-block">
                <Space size="large" align="baseline">
                  <Input
                    placeholder="Rechercher"
                    prefix={<SearchOutlined />}
                    style={{
                      height: "42px",
                      lineHeight: "30px",
                      borderColor: "#8E8E93",
                    }}
                  />
                  <Button
                    type="primary"
                    className="d_btn_primary"
                    onClick={() => setActeModalVisible(true)}
                  >
                    Ajouter un acte
                  </Button>
                  <UploadActe
                    visible={acteModal}
                    width={600}
                    onCreate={onActeModalCreate}
                    onCancel={() => setActeModalVisible(false)}
                  />
                </Space>
              </div>
            </Col>
          </Row>
          {actes ? (
            <Table
              columns={acte_columns}
              dataSource={actes.map((model) => {
                return {
                  id: model._id,
                  document: {
                    name: model.name,
                    updatedAt: moment(model.updatedAt).format("LL"),
                  },
                  date: moment(model.createdAt).format("LL"),
                };
              })}
              scroll={{ x: 1000 }}
            />
          ) : (
            <Table columns={acte_columns} dataSource={[]} />
          )}
        </TabPane>
      </Tabs>
    </>
  );
};

export default DocumentDetails;
