import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Button,
  List,
  Typography,
  Form,
  Modal,
  Input,
  Empty,
  Skeleton,
  Tooltip,
  Popconfirm,
  Upload,
  Result,
} from "antd";
import {
  ExclamationCircleOutlined,
  FilterFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { PDF } from "../../components";

import { Icon } from "@iconify/react";
import attachmentIcon from "@iconify/icons-iconoir/attachment";
import bxEdit from "@iconify/icons-bx/bx-edit";
import deleteFilled from "@iconify/icons-ant-design/delete-filled";
import fileOutlined from "@iconify/icons-ant-design/file-outlined";

import {
  getClient,
  updateClient,
  addClientFolder,
  removeClientFolder,
  deleteClient,
  updateRessource,
} from "../../actions/client";
import {
  getFolders,
  addToFolderClient,
  removeToFolderClient,
} from "../../actions/folder";
import * as FileUploader from "../../services/file-uploader.service";

import "./styles.scss";

const ClientDetails = () => {
  const { id } = useParams();
  const client = useSelector((state) => state.client.client);
  const folders = useSelector((state) => state.folder.folders);
  const [folderFilter, setFolderFilter] = useState("");
  const [data, setData] = useState(null);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [formMessage, setFormMessage] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [addBtnLoad, setAddBtnLoad] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [filePropreties, setFilePropreties] = useState({
    previewVisible: false,
    renameText: "",
  });
  const [fileUploading, setFileUploading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClient(id)).then(() => setData(client));
    dispatch(getFolders());
  }, []);

  const [form] = Form.useForm();

  const rule = {
    required: true,
    message: "Ce champ est obligatoire",
  };

  const onDeleteClient = (id) => {
    Modal.confirm({
      title: "Vous êtes sûr de vouloir supprimer ce client ?",
      icon: <ExclamationCircleOutlined />,
      content: "Veillez notez que cette action est irréversible",
      okText: "Oui, Supprimer",
      okType: "danger",
      cancelText: "Non",
      onOk() {
        dispatch(deleteClient(id))
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

  const addFolder = () => {
    setAddBtnLoad(true);
    dispatch(
      addClientFolder(
        id,
        folders
          .filter((folder) => folder.checked === true)
          .map((folder) => folder._id)
      )
    ).then(() => {
      const folderSelected = folders
        .filter((folder) => folder.checked === true)
        .map((folder) => folder._id);
      console.log(folderSelected);
      if (folderSelected.length) {
        folderSelected.map((folderId) =>
          dispatch(addToFolderClient(folderId, [id])).then(() => {
            setAddBtnLoad(false);
            setAddModal(false);
          })
        );
      }
    });
  };

  const checkbox = (id) =>
    Object.assign(
      folders,
      folders.map((state) =>
        state._id === id
          ? (state = { ...state, checked: !state.checked })
          : state
      )
    );

  const onFinish = (values) => {
    console.log("Success:", client._id, values);
    setConfirmLoading(true);
    dispatch(updateClient(client._id, values))
      .then(() => {
        setConfirmLoading(false);
        setFormMessage(
          <>
            <CheckCircleFilled style={{ color: "#00db80" }} />{" "}
            <span className="message"> Modifications sauvegardées</span>
          </>
        );
      })
      .catch((error) => {
        setFormMessage(
          <>
            <CloseCircleFilled style={{ color: "#f44336" }} />{" "}
            <span className="message"> Erreur lors de la sauvegarde</span>
          </>
        );
        console.log(error);
        setConfirmLoading(false);
      });
  };

  const uploadProps = {
    showUploadList: false,
    listType: "picture-card",
    accept: "*",
    beforeUpload(file) {
      setFileUploading(true);
      console.log(file);
      add_ressource_to_client(file);
    },
  };

  function add_ressource_to_client(file) {
    FileUploader.send(file)
      .then((res) => {
        console.log(res);
        dispatch(
          updateRessource(
            id,
            Array.isArray(client.associatedDocuments)
              ? {
                  ...client,
                  associatedDocuments: [
                    ...client.associatedDocuments,
                    {
                      id: res.data.public_id,
                      name: res.data.original_filename,
                      url: res.data.url,
                      format: file.name.split(".").pop(),
                    },
                  ],
                }
              : {
                  ...client,
                  associatedDocuments: [
                    {
                      id: res.data.public_id,
                      name: res.data.original_filename,
                      url: res.data.url,
                      format: res.data.format,
                    },
                  ],
                }
          )
        ).then(() => {
          setFileUploading(false);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function update_client_by_removing_ressource(publicId) {
    Modal.confirm({
      title: "Voulez-vous supprimer ce fichier ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(
          updateRessource(id, {
            ...client,
            associatedDocuments: client.associatedDocuments.filter(
              (document) => document.id !== publicId
            ),
          })
        ).then(() => setFilePropreties({ previewVisible: false }));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  function update_client_by_renaming_ressource_name(publicId) {
    dispatch(
      updateRessource(id, {
        ...client,
        associatedDocuments: client.associatedDocuments.map((document) =>
          document.id === publicId
            ? (document = {
                ...document,
                name: filePropreties.name,
              })
            : document
        ),
      })
    ).then(() => {});
  }

  function viewDocument(document) {
    console.log(document);
    setFilePropreties({
      previewVisible: true,
      fileId: document.id,
      ...document,
    });
  }

  const { previewVisible, fileId, name, url, format } = filePropreties;

  return data ? (
    <>
      <div className="client-title">
        <span onClick={() => history.goBack()}>RETOUR</span>
        <div className="flex justify-center">
          {client ? (
            <Typography.Title
              className=""
              level={3}
            >{`${client.firstname} ${client.lastname}`}</Typography.Title>
          ) : (
            <Skeleton active={true} />
          )}
        </div>
      </div>

      <div className="w-8/12 py-4 m-auto">
        <Form
          form={form}
          initialValues={client}
          name="form"
          className="form"
          onFinish={onFinish}
        >
          <div className="form-group flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 pr-3">
              <label>Prénom de l'utilisateur</label>
              <Form.Item name="firstname" rules={[rule]}>
                <Input
                  size="large"
                  placeholder="Entrer le prénom de l'utilisateur"
                  name="firstname"
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2 pl-3">
              <label>Nom de l'utilisateur</label>
              <Form.Item name="lastname" rules={[rule]}>
                <Input
                  size="large"
                  placeholder="Entrer le nom de l'utilisateur"
                  name="lastname"
                />
              </Form.Item>
            </div>
          </div>

          <div className="form-group user-folder">
            <label>Dossiers assignés</label>
            <div className="flex justify-between mb-3">
              <Button onClick={() => setAddModal(true)}>Ajouter</Button>
              <Modal
                className="add-folder"
                title="Liste des dossiers"
                visible={addModal}
                onCancel={() => setAddModal(false)}
                footer={
                  <Button
                    type="primary"
                    onClick={() => addFolder()}
                    loading={addBtnLoad}
                  >
                    Ajouter
                  </Button>
                }
              >
                <List
                  dataSource={folders ? folders : []}
                  renderItem={(item) => (
                    <List.Item>
                      <Checkbox onChange={() => checkbox(item._id)}>
                        <Typography.Title level={4}>
                          {" "}
                          {item.name}
                        </Typography.Title>
                      </Checkbox>
                    </List.Item>
                  )}
                />
              </Modal>
              <Input
                className="md:w-1/2"
                suffix={
                  <Tooltip title="Filtrer le resultat">
                    <FilterFilled />
                  </Tooltip>
                }
                placeholder="Filtrer la liste"
                value={folderFilter}
                onChange={(e) => setFolderFilter(e.target.value.toLowerCase())}
              ></Input>
            </div>

            <List
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    imageStyle={{
                      height: 60,
                    }}
                    description={<span>Aucun dossier trouvé</span>}
                  ></Empty>
                ),
              }}
              dataSource={
                client.folders
                  ? client.folders.filter((item) => {
                      return (
                        item.name
                          .toLowerCase()
                          .indexOf(folderFilter.toLowerCase()) !== -1 ||
                        item.service
                          .toLowerCase()
                          .indexOf(folderFilter.toLowerCase()) !== -1 ||
                        item.status
                          .toLowerCase()
                          .indexOf(folderFilter.toLowerCase()) !== -1
                      );
                    })
                  : []
              }
              renderItem={(item) => (
                <div className="list-item">
                  <List.Item
                    actions={[
                      <Popconfirm
                        title="Etes-vous sûr de vouloir supprimer l'accès à ce dossier?"
                        onConfirm={() => {
                          dispatch(
                            removeClientFolder(id, {
                              data: { folderId: item._id },
                            })
                          ).then(() =>
                            dispatch(
                              removeToFolderClient(item._id, {
                                data: { clientId: id },
                              })
                            )
                          );
                        }}
                        okText="Oui, Supprimer"
                        cancelText="Non"
                      >
                        <Button>Révoquer</Button>
                      </Popconfirm>,
                    ]}
                  >
                    <List.Item.Meta title={`${item.name}`} />
                  </List.Item>
                </div>
              )}
            ></List>
          </div>
          <div className="form-group associate-doc">
            <div className="w-full mb-8 ">
              <label>Pièces associées</label>
              <div class="grid grid-cols-6  sm:grid-cols-4  gap-4">
                {fileUploading ? (
                  <span className="file-uploading">
                    <LoadingOutlined />
                  </span>
                ) : null}
                {client.associatedDocuments &&
                  client.associatedDocuments.map((document) => {
                    return (
                      <>
                        <span
                          className="file-list"
                          onDoubleClick={() => viewDocument(document)}
                        >
                          <Icon icon={attachmentIcon} color="#2F80ED" />
                          <p title={document.name}>{document.name}</p>
                        </span>
                      </>
                    );
                  })}

                <Upload {...uploadProps}>
                  <div>
                    <PlusOutlined />
                    <div className="upload-text">Ajouter</div>
                  </div>
                </Upload>
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
                            update_client_by_renaming_ressource_name(fileId);
                          }}
                        >
                          Renommer
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h4 className="preview-title">{name}</h4>
                        <div className="flex justify-center preview-action">
                          <span className="edit-title">
                            <Icon
                              icon={bxEdit}
                              color="#0076b9"
                              onClick={() => setOnEdit(true)}
                            />
                          </span>
                          <span className="delete">
                            <Icon
                              icon={deleteFilled}
                              color="#0076b9"
                              onClick={() =>
                                update_client_by_removing_ressource(fileId)
                              }
                            />
                          </span>
                        </div>
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
              </div>
            </div>
          </div>
          <div className="form-footer">
            <Button className="ant-btn" onClick={() => onDeleteClient(id)}>
              <span>Supprimer</span>
            </Button>
            <span className="formMessage">{formMessage}</span>
            <Button
              className="ant-btn ant-btn-primary"
              htmlType="submit"
              loading={confirmLoading}
            >
              <span>Mettre à jour</span>
            </Button>
          </div>
        </Form>
      </div>
    </>
  ) : (
    <Skeleton active={true} rows={10} />
  );
};

export default ClientDetails;
