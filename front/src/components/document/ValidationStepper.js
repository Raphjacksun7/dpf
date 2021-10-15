import React, { useEffect, useState } from "react";
import {
  notification,
  Avatar,
  Button,
  Empty,
  Input,
  List,
  Modal,
  Result,
  Steps,
  Popover,
  Upload,
  Spin,
} from "antd";

import { ExclamationCircleOutlined } from "@ant-design/icons";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateFolder } from "../../actions/folder";
import {
  createDModel,
  deleteDModel,
  getDModelsByFolder,
  updateDModel,
} from "../../actions/d-model";
import * as FileUploader from "../../services/file-uploader.service";

import { Icon } from "@iconify/react";
import bxEdit from "@iconify/icons-bx/bx-edit";
import deleteFilled from "@iconify/icons-ant-design/delete-filled";
import fileOutlined from "@iconify/icons-ant-design/file-outlined";
import attachmentIcon from "@iconify/icons-iconoir/attachment";
import { BASE_URL, TO_VERIFIED } from "../../constants";
import { PDF } from "..";
import "./styles.scss";
import { getUsers } from "../../actions/user";

export default function ValidationStepper() {
  const { id } = useParams();
  const users = useSelector((state) => state.user.users);
  const folder = useSelector((state) => state.folder.folder);
  const dModels = useSelector((state) => state.dModel.folderDModels);
  const dispatch = useDispatch();
  const history = useHistory();

  const [btnLoading, setBtnLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [verification_state, set_verification_state] = useState({
    userListLoading: false,
    userListModal: false,
    userList: [],
    errorUser: null,
    userFilter: "",
    motif: "",
  });
  const [filePropreties, setFilePropreties] = useState({
    previewVisible: false,
  });
  const {
    userListLoading,
    userListModal,
    userList,
    errorUser,
    userFilter,
    motif,
  } = verification_state;
  const { previewVisible, modeleId, name, url, format } = filePropreties;

  useEffect(() => {
    dispatch(getDModelsByFolder(id));
    dispatch(getUsers()).then(() => {
      set_verification_state({
        userList: users.map((user) => {
          return {
            ...user,
            isClick: false,
          };
        }),
      });
    });
  }, []);

  const customDot = (dot, { status, index }) => (
    <Popover content={<span>Étape {index + 1}</span>}>{dot}</Popover>
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

  function uploadProof(file) {
    setBtnLoading(true);
    FileUploader.send(file)
      .then((res) => {
        console.log(res);
        dispatch(
          createDModel({
            name: res.data.original_filename,
            modelType: "JUSTIFICATIF",
            fileURI: res.data.url,
            folder: id,
          })
        )
          .then((response) => {
            notification.success({
              message: "Votre pièce jointe a été ajouté avec succès !",
              duration: 3,
            });
            dispatch(getDModelsByFolder(id));
            setBtnLoading(false);
          })
          .catch((onSaveError) => {
            notification.error({
              message: "Une erreur !",
              description:
                "L'ajout du fichier a échoué, vérifiez votre connexion Internet et réessayez.",
              duration: 3,
            });
            setBtnLoading(false);
            console.log(onSaveError);
          });
      })
      .catch((e) => {
        setBtnLoading(false);
        console.log(e);
      });
  }

  function assign_to_user_for_verification(user, type) {
    const { auth, folder, dModel } = this.props;
    this.setState({
      userListLoading: true,
    });
    this.props
      .createTask({
        taskType: type,
        ressourceId: dModel._id,
        status: "ATTENTE",
        motif: this.state.motif,
        sender: auth.sub,
        reciever: user._id,
      })
      .then((response) => {
        console.log(response, user);
        this.props
          .updateFolder(this.props.dModel.folder, {
            ...folder,
            status: type,
          })
          .then(() => {
            this.props.newTask({
              to: user.email,
              variables: {
                confirmation_link: `${BASE_URL}action/${response._id}`,
                sender_motif: this.state.motif
                  ? this.state.motif
                  : "Aucune observation particulière ",
                sender_name: auth.firstname + " " + auth.lastname,
                user_first_name: user.firstname,
                model_name: this.props.dModel.name,
              },
            });
            this.setState(
              {
                userListLoading: false,
                userListReviewModal: false,
                userListFinanceModal: false,
              },
              notification.success({
                message: `Vous avez assigné ce modèle à ${user.firstname} avec succès !`,
                description: null,
                duration: 3,
              })
            );
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              userListLoading: false,
              errorUser: "Une erreur s'est produit",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          userListLoading: false,
          errorUser: "Une erreur s'est produit",
        });
      });
  }

  return (
    <div className="validation-stepper">
      <Button
        type="primary"
        onClick={() => set_verification_state({ userListModal: true })}
      >
        Faire valider ce dossier
      </Button>
      <Steps current={1} progressDot={customDot}>
        <Steps.Step title="À verifier" />
        <Steps.Step
          title="En cours de vérification"
          description="You can hover on the dot."
        />
        <Steps.Step title="À traiter" />
      </Steps>
      <div className="validation-proof">
        <h3>Liste des pièces justificatives</h3>
        <Upload
          className="upload"
          showUploadList={false}
          accept="*"
          beforeUpload={(file) => {
            console.log(file);
            uploadProof(file);
          }}
        >
          <Button loading={btnLoading}>Ajouter une pièce jointe</Button>
        </Upload>
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
                description={<span>Aucune pièce ajouté pour le moment</span>}
              ></Empty>
            ),
          }}
          dataSource={dModels.map((model) => {
            return {
              id: model._id,
              document: {
                name: model.name,
                modelType: model.modelType,
              },
              fileURI: model.fileURI,
              date: moment(model.createdAt).format("LL"),
            };
          })}
          renderItem={(document) => (
            <List.Item onClick={() => viewDocument(document)}>
              <List.Item.Meta
                avatar={<Icon icon={attachmentIcon} color="#2F80ED" />}
                title={document.document.name}
                description={
                  <>
                    Ajouté le <span>{document.date}</span>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
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

      {/* Assign folder for verification by a user (Modal )*/}
      <Modal
        className="user-list"
        visible={userListModal}
        onCancel={(e) => {
          e.stopPropagation();
          set_verification_state({ userListModal: false });
        }}
      >
        <Spin spinning={false} tip="Envoie de l'action en cours...">
          <Input
            className="search"
            type="search"
            placeholder="Rechercher un utilisateur"
            value={userFilter}
            onChange={(e) =>
              set_verification_state({
                ...verification_state,
                userFilter: e.target.value.toLowerCase(),
              })
            }
          ></Input>

          <List
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
            dataSource={
              userList
                ? userList.filter((item) => {
                    console.log(verification_state.userFilter);
                    return (
                      item.firstname
                        .toLowerCase()
                        .indexOf(
                          userFilter ? userFilter.toLowerCase() : null
                        ) !== -1 ||
                      item.lastname
                        .toLowerCase()
                        .indexOf(
                          userFilter ? userFilter.toLowerCase() : null
                        ) !== -1
                    );
                  })
                : []
            }
            renderItem={(item) => (
              <div className="list-item">
                <List.Item
                  key={item.id}
                  onClick={() =>
                    set_verification_state({
                      userList: userList.map((state) =>
                        state._id === item._id
                          ? (state = { ...state, isClick: !state.isClick })
                          : state
                      ),
                    })
                  }
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
                </List.Item>

                {item.isClick ? (
                  <div className="motif">
                    <p>Ajouter un motif</p>
                    <Input.TextArea
                      value={motif}
                      onChange={(e) => {
                        set_verification_state({
                          ...verification_state,
                          motif: e.target.value,
                        });
                      }}
                    ></Input.TextArea>
                    <div className="item-footer">
                      <button
                        onClick={() =>
                          set_verification_state({
                            userList: userList.map((state) =>
                              state._id === item._id
                                ? (state = {
                                    ...state,
                                    isClick: !state.isClick,
                                  })
                                : state
                            ),
                          })
                        }
                      >
                        Annuler
                      </button>
                      <button
                        className="primary"
                        onClick={() => {
                          assign_to_user_for_verification(item, "VALIDATION");
                        }}
                      >
                        Assigner
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          ></List>

          {errorUser ? (
            <span className="error-message">{errorUser}</span>
          ) : null}
        </Spin>
      </Modal>
    </div>
  );
}
