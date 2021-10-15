import React, { Suspense, useEffect, useState } from "react";
import {
  Checkbox,
  Button,
  List,
  Typography,
  Form,
  Modal,
  Space,
  Input,
  Radio,
  Empty,
  Skeleton,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  ExclamationCircleOutlined,
  FilterFilled,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import {
  getUser,
  updateUser,
  addUserFolder,
  removeUserFolder,
  deleteUser,
} from "../../actions/user";

import "./styles.scss";
import { useParams } from "react-router";
import {
  getFolders,
  addToFolderUser,
  removeToFolderUser,
} from "../../actions/folder";

const UserDetails = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const folders = useSelector((state) =>
    state.folder.folders.map((folder) => {
      return {
        ...folder,
        checked: false,
      };
    })
  );
  const [folderFilter, setFolderFilter] = useState("");
  const [data, setData] = useState(null);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [addModal, setAddModal] = useState(false);
  const [formMessage, setFormMessage] = useState(null);
  const [addBtnLoad, setAddBtnLoad] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [role, setRole] = useState(false);

  useEffect(() => {
    dispatch(getUser(id)).then(() => setData(user));
    dispatch(getFolders());
  }, []);

  const rule = {
    required: true,
    message: "Ce champ est obligatoire",
  };

  const onDeleteUser = (id) => {
    Modal.confirm({
      title: "Vous êtes sûr de vouloir supprimer ce utilisateur ?",
      icon: <ExclamationCircleOutlined />,
      content: "Veillez notez que cette action est irréversible",
      okText: "Oui, Supprimer",
      okType: "danger",
      cancelText: "Non",
      onOk() {
        dispatch(deleteUser(id))
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

  const onFinish = (values) => {
    console.log("Success:", user._id, values);
    setConfirmLoading(true);
    dispatch(updateUser(user._id, values))
      .then(() => {
        setConfirmLoading(false);
        setFormMessage(
          <>
            <CheckCircleFilled style={{ color: "#00db80" }} />{" "}
            <span className="message">Modifications sauvegardées</span>
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

  const checkbox = (id) =>
    Object.assign(
      folders,
      folders.map((state) =>
        state._id === id
          ? (state = { ...state, checked: !state.checked })
          : state
      )
    );

  const addFolder = () => {
    setAddBtnLoad(true);
    dispatch(
      addUserFolder(
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
          dispatch(addToFolderUser(folderId, [id])).then(() => {
            setAddBtnLoad(false);
            setAddModal(false);
          })
        );
      }
    });
  };

  return data ? (
    <>
      <div className="user-title">
        <span onClick={() => history.goBack()}>RETOUR</span>
        <div className="flex justify-center">
          {user ? ( 
            <Typography.Title
              className=""
              level={3}
            >{`${user.firstname} ${user.lastname}`}</Typography.Title>
          ) : (
            <Skeleton active={true} />
          )}
        </div>
      </div>

      <div className="w-8/12 py-4 m-auto">
        <Form
          form={form}
          initialValues={user}
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

          <div className="form-group">
            <label>Adresse e-mail de l'utilisateur </label>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Ce champ doit etre un email",
                },
                rule,
              ]}
            >
              <Input
                size="large"
                placeholder="example@digitact.com"
                name="email"
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <div className="w-full md:w-1/2">
              <label>Role</label>
              <Form.Item name="role" rules={[rule]}>
                <Radio.Group
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <Space direction="horizontal">
                    <Radio value={"ADMIN"} style={{ fontWeight: "400" }}>
                      Administrateur
                    </Radio>
                    <Radio value={"FINA"} style={{ fontWeight: "400" }}>
                      Financier
                    </Radio>
                    <Radio value={"GEST"} style={{ fontWeight: "400" }}>
                      Gestionnaire
                    </Radio>
                  </Space>
                </Radio.Group>
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
                user.assignedFolder
                  ? user.assignedFolder.filter((item) => {
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
                            removeUserFolder(id, {
                              data: { folderId: item._id },
                            })
                          ).then(() =>
                            dispatch(
                              removeToFolderUser(item._id, {
                                data: { userId: id },
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
          <div className="form-footer">
            <Button className="ant-btn" onClick={() => onDeleteUser(id)}>
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

export default UserDetails;
