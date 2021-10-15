import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Empty,
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
  Skeleton,
  Result,
} from "antd";
import { CBadge } from "@coreui/react";
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import documentImg from "../../assets/document.png";
import UploadActe from "./UploadActe";
import Option from "./Option";
import { getFolder, updateFolder, deleteFolder } from "../../actions/folder";
import {
  deleteDModel,
  getDModelsByFolder,
  updateDModel,
} from "../../actions/d-model";
import { getActesByFolder } from "../../actions/acte";
import dataURItoBlob from "../../helpers/toBlob";

import { Icon } from "@iconify/react";
import arrowBackOutline from "@iconify/icons-eva/arrow-back-outline";
import overflowMenuVertical from "@iconify/icons-carbon/overflow-menu-vertical";
import bxEdit from "@iconify/icons-bx/bx-edit";
import deleteFilled from "@iconify/icons-ant-design/delete-filled";
import fileOutlined from "@iconify/icons-ant-design/file-outlined";
import fileTextFilled from "@iconify/icons-ant-design/file-text-filled";
import tagColor from "../../helpers/tagColor";
import "./styles.scss";
import { PDF } from "..";
import { TO_VERIFIED } from "../../constants";
import ValidationStepper from "./ValidationStepper";

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
            description={"Mise à jour le " + document.update_at}
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

const modele_columns = [
  {
    title: "Nom du document",
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
                <Tag className={tagColor(document.modelType)}>
                  {document.modelType}
                </Tag>
              </span>
            }
            description={"Mise à jour le " + document.updatedAt}
          />
        </List.Item>
      );
    },
  },
  {
    title: "Date d'ajout",
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
  }, [dispatch, id]);

  const [acteModal, setActeModalVisible] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);
  const [isModalVisible2, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [userFilter, setUserFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [acteFilter, setActeFilter] = useState("");

  const [onEdit, setOnEdit] = useState(false);
  const [filePropreties, setFilePropreties] = useState({
    previewVisible: false,
  });

  const onActeModalCreate = () => {
    console.log("After form validate");
    setActeModalVisible(false);
    dispatch(getActesByFolder(id));
  };

  const onCancelFolder = () => {
    Modal.confirm({
      title: "Annuler ce dossier ?",
      icon: <ExclamationCircleOutlined />,
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk() {
        dispatch(
          updateFolder(id, {
            ...folder,
            isCancelled: true,
          })
        )
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

  const onDeleteFolder = () => {
    Modal.confirm({
      title: "Vous êtes sûr de vouloir supprimer ce dossier ?",
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

  const cancelMenu = (
    <Menu>
      <Menu.ItemGroup key="g1" title="Paramètres du dossier">
        <Menu.Item
          key="0"
          onClick={() => {
            setUserModal(true);
          }}
        >
          Voir les ressources{" "}
          <Modal
            className="user-list"
            visible={userModal}
            onCancel={(e) => {
              e.stopPropagation();
              setUserModal(false);
            }}
          >
            <Input
              className="search"
              type="search"
              placeholder="Rechercher un utilisateur"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value.toLowerCase())}
            ></Input>

            <List
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    imageStyle={{
                      height: 60,
                    }}
                    description={
                      <span>
                        Aucun résultat ne correspond à votre recherche
                      </span>
                    }
                  ></Empty>
                ),
              }}
              dataSource={
                folder.users
                  ? folder.users.filter((item) => {
                      return (
                        item.firstname
                          .toLowerCase()
                          .indexOf(userFilter.toLowerCase()) !== -1 ||
                        item.lastname
                          .toLowerCase()
                          .indexOf(userFilter.toLowerCase()) !== -1
                      );
                    })
                  : []
              }
              renderItem={(item) => (
                <div className="list-item">
                  <List.Item key={item.id}>
                    <Skeleton
                      loading={folder.users.length === 0}
                      active
                      avatar
                      paragraph={{ rows: 1 }}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar size="large">
                            {`${item.firstname} ${item.lastname}`
                              .match(/\b(\w)/g)
                              .join("")
                              .toUpperCase()}
                          </Avatar>
                        }
                        title={`${item.firstname} ${item.lastname}`}
                      />
                    </Skeleton>
                  </List.Item>
                </div>
              )}
            ></List>
          </Modal>
        </Menu.Item>
        <Menu.Item
          key="1"
          onClick={() => {
            setClientModal(true);
          }}
        >
          Voir les clients
          <Modal
            className="user-list"
            visible={clientModal}
            onCancel={(e) => {
              e.stopPropagation();
              setClientModal(false);
            }}
          >
            <Input
              className="search"
              type="search"
              placeholder="Rechercher un client"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value.toLowerCase())}
            ></Input>

            <List
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    imageStyle={{
                      height: 60,
                    }}
                    description={
                      <span>
                        Aucun résultat ne correspond à votre recherche
                      </span>
                    }
                  ></Empty>
                ),
              }}
              dataSource={
                folder.clients
                  ? folder.clients.filter((item) => {
                      return (
                        item.firstname
                          .toLowerCase()
                          .indexOf(clientFilter.toLowerCase()) !== -1 ||
                        item.lastname
                          .toLowerCase()
                          .indexOf(clientFilter.toLowerCase()) !== -1
                      );
                    })
                  : []
              }
              renderItem={(item) => (
                <div className="list-item">
                  <List.Item key={item.id}>
                    <Skeleton
                      loading={folder.clients.length === 0}
                      active
                      avatar
                      paragraph={{ rows: 1 }}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar size="large">
                            {`${item.firstname} ${item.lastname}`
                              .match(/\b(\w)/g)
                              .join("")
                              .toUpperCase()}
                          </Avatar>
                        }
                        title={`${item.firstname} ${item.lastname}`}
                      />
                    </Skeleton>
                  </List.Item>
                </div>
              )}
            ></List>
          </Modal>
        </Menu.Item>
        <Menu.Item key="2" danger onClick={onCancelFolder}>
          Annuler le dossier
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  function delete_dModel(modeleId) {
    Modal.confirm({
      title: "Voulez-vous supprimer ce fichier ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteDModel(modeleId)).then(() => {
          setFilePropreties({ previewVisible: false });
          dispatch(getDModelsByFolder(id));
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  function update_dModel_name(modeleId) {
    dispatch(
      updateDModel(modeleId, {
        fileURI: filePropreties.url,
        modelType: "JUSTIFICATIF",
        name: filePropreties.name,
      })
    ).then(() => dispatch(getDModelsByFolder(id)));
  }

  function viewDocument(document) {
    console.log(document);
    setFilePropreties({
      previewVisible: true,
      name: document.document.name,
      url: document.fileURI,
      format: document.fileURI.split(".").pop(),
      modeleId: document.id,
    });
  }

  function uncanceled_folder() {
    dispatch(
      updateFolder(id, {
        ...folder,
        isCancelled: false,
      })
    );
  }

  function customer_proof() {
    let data = [];
    folder.clients.map((client) =>
      client.associatedDocuments.map((document) =>
        data.push({
          ...document,
          client_name: client.firstname + " " + client.lastname,
        })
      )
    );
    console.log(data);
    return data;
  }

  const { previewVisible, modeleId, name, url, format } = filePropreties;

  return (
    <>
      {folder.status !== TO_VERIFIED
        ? [
            folder.isCancelled ? (
              <Result
                className="result"
                status="warning"
                title="Ce dossier a été annulé"
                extra={[
                  <Button
                    type="primary"
                    key="reactivate"
                    onClick={() => uncanceled_folder()}
                  >
                    Réactiver
                  </Button>,
                  <Button key="back" onClick={() => history.goBack()}>
                    Retour
                  </Button>,
                ]}
              />
            ) : (
              <>
                {Object.entries(folder).length > 0 ? (
                  <div className="block">
                    <div className="title">
                      <Icon
                        icon={arrowBackOutline}
                        onClick={() => history.goBack()}
                      />
                      <Typography.Title level={2}>
                        {folder.name}
                      </Typography.Title>
                      <CBadge className={tagColor(folder.status)}>
                        {" "}
                        {folder.status}
                      </CBadge>
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
                    </Typography.Title>
                  </div>
                ) : (
                  <Skeleton className="skeleton-s1" active />
                )}

                <Tabs defaultActiveKey="1" size="middle">
                  <Tabs.TabPane tab="Document" key="1">
                    <Row>
                      <Col span={8}>
                        <Typography.Title level={4}>
                          Document de ce dossier
                        </Typography.Title>
                      </Col>
                      <Col span={12} offset={4}>
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
                              value={modelFilter}
                              onChange={(e) =>
                                setModelFilter(e.target.value.toLowerCase())
                              }
                            />
                            <Button
                              className="d_btn_primary"
                              type="primary"
                              onClick={() => setIsModalVisible(true)}
                            >
                              Nouveau document
                            </Button>
                            <Modal
                              className="hideFooter"
                              centered
                              visible={isModalVisible2}
                              onCancel={() => setIsModalVisible(false)}
                              width={700}
                              style={{ top: -80 }}
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
                        tip="Ouverture du document..."
                      >
                        <Table
                          locale={{
                            emptyText: (
                              <Empty
                                image={Empty.PRESENTED_IMAGE_DEFAULT}
                                imageStyle={{
                                  height: 60,
                                }}
                                description={
                                  <span>
                                    Aucun résultat ne correspond à votre
                                    recherche
                                  </span>
                                }
                              ></Empty>
                            ),
                          }}
                          columns={modele_columns}
                          dataSource={dModels
                            .map((model) => {
                              return {
                                id: model._id,
                                document: {
                                  name: model.name,
                                  updatedAt: moment(model.updatedAt).format(
                                    "LL"
                                  ),
                                  modelType: model.modelType,
                                },
                                fileURI: model.fileURI,
                                date: moment(model.createdAt).format("LL"),
                              };
                            })
                            .filter((item) => {
                              return (
                                item.document.name
                                  .toLowerCase()
                                  .indexOf(modelFilter.toLowerCase()) !== -1
                              );
                            })}
                          scroll={{ x: 700 }}
                          onRow={(record, rowIndex) => {
                            return {
                              onClick: (event) => {
                                console.log(record);
                                if (
                                  record.document.modelType !== "JUSTIFICATIF"
                                ) {
                                  setConfirmLoading(true);
                                  var request = new XMLHttpRequest();
                                  request.open(
                                    "GET",
                                    record.fileURI.replace(
                                      "http://",
                                      "https://"
                                    ),
                                    true
                                  );
                                  request.responseType = "blob";
                                  request.onload = function () {
                                    var reader = new FileReader();
                                    reader.readAsDataURL(request.response);
                                    reader.onload = function (e) {
                                      setConfirmLoading(false);
                                      // console.log("DataURL:", e.target.result);
                                      console.log(
                                        dataURItoBlob(e.target.result)
                                      );
                                      history.push(
                                        `/editor/edit/${record.id}`,
                                        {
                                          data: dataURItoBlob(e.target.result),
                                        }
                                      );
                                    };
                                  };
                                  request.send();
                                } else {
                                  viewDocument(record);
                                }
                              },
                            };
                          }}
                        />
                      </Spin>
                    ) : (
                      <Table columns={modele_columns} dataSource={[]} />
                    )}
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Actes signés" key="2">
                    <Row>
                      <Col span={8}>
                        <Typography.Title level={4}>
                          Liste des actes signés
                        </Typography.Title>
                      </Col>
                      <Col span={12} offset={4}>
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
                              value={acteFilter}
                              onChange={(e) =>
                                setActeFilter(e.target.value.toLowerCase())
                              }
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
                        locale={{
                          emptyText: (
                            <Empty
                              image={Empty.PRESENTED_IMAGE_DEFAULT}
                              imageStyle={{
                                height: 60,
                              }}
                              description={
                                <span>
                                  Aucun résultat ne correspond à votre recherche
                                </span>
                              }
                            ></Empty>
                          ),
                        }}
                        columns={acte_columns}
                        dataSource={actes
                          .map((acte) => {
                            return {
                              id: acte._id,
                              document: {
                                name: acte.name,
                                updatedAt: moment(acte.updatedAt).format("LL"),
                              },
                              file: acte.fileURI,
                              date: moment(acte.createdAt).format("LL"),
                            };
                          })
                          .filter((item) => {
                            return (
                              item.document.name
                                .toLowerCase()
                                .indexOf(acteFilter.toLowerCase()) !== -1
                            );
                          })}
                        scroll={{ x: 700 }}
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: (event) => {
                              console.log(record);
                              history.push(`/acte/${record.id}`, {
                                data: record.file,
                              });
                            },
                          };
                        }}
                      />
                    ) : (
                      <Table columns={acte_columns} dataSource={[]} />
                    )}
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Justificatifs" key="3">
                    <List
                      className="proof-list"
                      itemLayout="horizontal"
                      locale={{
                        emptyText: (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_DEFAULT}
                            imageStyle={{
                              height: 60,
                            }}
                            description={
                              <span>
                                Aucun résultat ne correspond à votre recherche
                              </span>
                            }
                          ></Empty>
                        ),
                      }}
                      dataSource={folder.clients ? customer_proof() : []}
                      renderItem={(document) => (
                        <List.Item
                          onClick={() =>
                            setFilePropreties({
                              previewVisible: true,
                              name: document.name,
                              url: document.url,
                              format: document.url.split(".").pop(),
                              modeleId: undefined,
                            })
                          }
                        >
                          <List.Item.Meta
                            avatar={
                              <Icon icon={fileTextFilled} color="#9ca6af" />
                            }
                            title={document.name}
                            description={
                              <>
                                Pièce jointe de ·{" "}
                                <span>{document.client_name}</span>
                              </>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Tabs.TabPane>
                </Tabs>

                {/* File Viewer */}
                <Modal
                  className="preview-document"
                  visible={previewVisible}
                  footer={null}
                  onCancel={() => {
                    setFilePropreties({ previewVisible: false });
                    setOnEdit(false);
                  }}
                >
                  <div className="flex justify-between preview-header">
                    {onEdit ? (
                      <div className="edit-block">
                        <Input
                          defaultValue={name}
                          onChange={(e) => {
                            setFilePropreties({
                              ...filePropreties,
                              name: e.target.value,
                            });
                          }}
                        />
                        <Button
                          type="primary"
                          onClick={() => {
                            setOnEdit(false);
                            update_dModel_name(modeleId);
                          }}
                        >
                          Renommer
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h4 className="preview-title">{name}</h4>
                        {modeleId !== undefined ? (
                          <div className="flex justify-center preview-action">
                            <span className="edit-title">
                              <Icon
                                icon={bxEdit}
                                color="#0076b9"
                                onClick={() => {
                                  setOnEdit(true);
                                }}
                              />
                            </span>
                            <span className="delete">
                              <Icon
                                icon={deleteFilled}
                                color="#0076b9"
                                onClick={() => delete_dModel(modeleId)}
                              />
                            </span>
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                  {/\.(jpe?g|png|gif|bmp)$/i.test(url) ? (
                    <img alt={name} src={url} />
                  ) : null}
                  {/\.(pdf)$/i.test(url) ? <PDF url={url} /> : null}
                  {!/\.(pdf|jpe?g|png|gif|bmp)$/i.test(url) ? (
                    <Result
                      icon={
                        <>
                          <Icon icon={fileOutlined} color="#CDCDCD" />
                          <span className="format">.{format}</span>
                        </>
                      }
                      title="Ce fichier ne peut pas être lu directement dans l'application 
                      téléchargez-le pour le lire."
                      extra={
                        <Button type="primary" href={url}>
                          Télécharger
                        </Button>
                      }
                    />
                  ) : null}
                </Modal>
              </>
            ),
          ]
        : <ValidationStepper/>}
    </>
  );
};

export default DocumentDetails;
