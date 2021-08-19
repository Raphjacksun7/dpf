import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  notification,
  Button,
  Empty,
  Typography,
  Dropdown,
  Avatar,
  List,
  Modal,
  Menu,
  Spin,
  Input,
  Skeleton,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Editor } from "../../components";

import htmlDocx from "html-docx-js/dist/html-docx";

import { Icon } from "@iconify/react";
import roundSave from "@iconify/icons-ic/round-save";
import baselineRateReview from "@iconify/icons-ic/baseline-rate-review";
import moneyIcon from "@iconify/icons-grommet-icons/money";
import caretDownFill from "@iconify/icons-bi/caret-down-fill";
import deleteIcon from "@iconify/icons-carbon/delete";

import { getFolder } from "../../actions/folder";
import { getDModel } from "../../actions/d-model";
import { getUsers } from "../../actions/user";
import { createTask } from "../../actions/task";
import { deleteDModel } from "../../actions/d-model";
import { updateFolder } from "../../actions/folder";
import { updateDModel } from "../../actions/d-model";
import { history } from "../../helpers/history";
import { CLOUDINARY_NAME, UPLOAD_PRESET } from "../../constants";
import { connect } from "react-redux";
import "./styles/document.scss";
import { withRouter } from "react-router";

class EditDocument extends React.Component {
  constructor() {
    super();
    this.onUserClicked = this.onUserClicked.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.deleteModel = this.deleteModel.bind(this);

    this.idModele = history.location.pathname.split("/")[3];
    this.state = {
      editModelLoading: false,
      saveModelLoading: false,
      userListLoading: false,
      userListModal: false,
      userList: [],
      isUserClicked: false,
      errorUser: null,
      userFilter: "",
      motif: "",
    };
  }

  componentDidMount() {
    console.log(history.location,"het") 
    this.props.getUsers().then(() => {
      this.setState({
        userList: this.props.users.map((user) => {
          return {
            ...user,
            isClick: false,
          };
        }),
      });
    });
    this.props.getDModel(this.idModele).then(() => {
      this.props.getFolder(this.props.dModel.folder);
    });
  }

  onUserClicked(id) {
    this.setState({
      userList: this.state.userList.map((state) =>
        state._id === id
          ? (state = { ...state, isClick: !state.isClick })
          : state
      ),
    });
  }

  assign(user) {
    const { auth, folder, dModel } = this.props;
    this.setState({
      userListLoading: true,
    });
    this.props
      .createTask({
        taskType: "REVISION",
        ressourceId: dModel._id,
        status: "ATTENTE",
        motif: this.state.motif,
        sender: auth.sub,
        reciever: user._id,
      })
      .then((response) => {
        console.log(response);
        this.props
          .updateFolder(this.props.dModel.folder, {
            ...folder,
            status: "REVISION",
          })
          .then(() => {
            this.setState(
              {
                userListLoading: false,
                userListModal: false,
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

  updateModel(blodFile) {
    var reader = new FileReader();
    reader.readAsDataURL(blodFile);
    reader.onloadend = function () {
      const base64data = reader.result;
      this.setState({ saveModelLoading: true });
      this.setState({ saveModal: false });
      const formData = new FormData();
      formData.append("file", base64data);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUDINARY_NAME);
      try {
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`,
            formData
          )
          .then(async (uploadRes) => {
            console.log(uploadRes);
            this.props
              .updateDModel(this.props.dModel._id, {
                ...this.props.dModel,
                fileURI: uploadRes.data.url,
              })
              .then((onSaveRes) => {
                notification.success({
                  message: "Votre modèle a été mise à jour avec succès !",
                  description: null,
                  duration: 3,
                });
                this.setState({ saveModelLoading: false });
              })
              .catch((onSaveError) => {
                notification.error({
                  message: "Une erreur !",
                  description:
                    "L'enregistrement du modèle a échoué, vérifiez votre connexion Internet et réessayez.",
                  duration: 3,
                });
                console.log(onSaveError);
                this.setState({ saveModelLoading: false });
              });
          })
          .catch((uploadError) => {
            notification.error({
              message: "Une erreur !",
              description:
                "Le téléversement du fichier a échoué, verifier votre connexion internet et reéssayer",
              duration: 3,
            });
            console.log(uploadError);
            this.setState({ saveModelLoading: false });
          });
      } catch (error) {
        console.log(error);
      }
    }.bind(this);
  }

  deleteModel() {
    return Modal.confirm({
      title: "Vous êtes sûr de vouloir supprimer ce modèle ?",
      icon: <ExclamationCircleOutlined />,
      content: "Veillez notez que cette action est irréversible",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk() {
        this.props
          .deleteDModel(this.idModele)
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
  }

  render() {
    const { folder, dModel } = this.props;
    return (
      <>
        <div className="editor-header flex justify-between">
          <div className="flex flex-wrap items-center">
            <Typography.Title level={4}>{folder.name}</Typography.Title>
            <Typography.Title level={5} className="block w-full">
              <span>{dModel.name}</span>
            </Typography.Title>
          </div>

          <div className="flex flex-wrap items-center">
            <Button
              className="btn-primary mr-3"
              icon={
                <Icon
                  icon={roundSave}
                  style={{ color: "#fff", marginRight: "6px" }}
                />
              }
              onClick={() => {
                const html =
                  '<!DOCTYPE html><html><head lang="fr">' +
                  '<meta charset="UTF-8"><title></title></head><body>' +
                  document.getElementsByClassName("fr-element")[0].innerHTML +
                  "</body></html>";
                this.updateModel(new Blob([html]));
              }}
            >
              Enregistrer
            </Button>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    key="0"
                    icon={
                      <Icon
                        icon={baselineRateReview}
                        style={{ color: "#3d3e3e", marginRight: "6px" }}
                      />
                    }
                  >
                    <span>Changer le type de modèle</span>
                  </Menu.Item>
                  <Menu.Item
                    key="1"
                    icon={
                      <Icon
                        icon={baselineRateReview}
                        style={{ color: "#3d3e3e", marginRight: "6px" }}
                      />
                    }
                    onClick={() => {
                      this.setState({ userListModal: true });
                    }}
                  >
                    <span>Assigner pour revison</span>
                    <Modal
                      className="user-list"
                      visible={this.state.userListModal}
                      onCancel={(e) => {
                        e.stopPropagation();
                        this.setState({ userListModal: false });
                      }}
                    >
                      <Spin
                        spinning={this.state.userListLoading}
                        tip="Envoie de l'action en cours..."
                      >
                        <Input
                          className="search"
                          type="search"
                          placeholder="Rechercher un utilisateur"
                          value={this.state.userFilter}
                          onChange={(e) =>
                            this.setState({
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
                                description={
                                  <span>
                                    Aucun résultat ne correspond à votre
                                    recherche
                                  </span>
                                }
                              ></Empty>
                            ),
                          }}
                          dataSource={this.state.userList.filter((item) => {
                            return (
                              item.firstname
                                .toLowerCase()
                                .indexOf(
                                  this.state.userFilter.toLowerCase()
                                ) !== -1 ||
                              item.lastname
                                .toLowerCase()
                                .indexOf(
                                  this.state.userFilter.toLowerCase()
                                ) !== -1
                            );
                          })}
                          renderItem={(item) => (
                            <div className="list-item">
                              <List.Item
                                key={item.id}
                                onClick={() => {
                                  this.onUserClicked(item._id);
                                }}
                              >
                                <Skeleton
                                  loading={this.state.userList.length === 0}
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

                              {item.isClick ? (
                                <div className="motif">
                                  <p>Ajouter un motif</p>
                                  <Input.TextArea
                                    value={this.state.motif}
                                    onChange={(e) => {
                                      this.setState({
                                        motif: e.target.value,
                                      });
                                    }}
                                  ></Input.TextArea>
                                  <div className="item-footer">
                                    <button
                                      onClick={() => {
                                        this.onUserClicked(item._id);
                                      }}
                                    >
                                      Annuler
                                    </button>
                                    <button
                                      className="primary"
                                      onClick={() => {
                                        this.assign(item);
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

                        {this.state.errorUser ? (
                          <span className="error-message">
                            {this.state.errorUser}
                          </span>
                        ) : null}
                      </Spin>
                    </Modal>
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={
                      <Icon
                        icon={moneyIcon}
                        style={{ color: "#3d3e3e", marginRight: "6px" }}
                      />
                    }
                  >
                    <span>Validation financiere</span>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    key="3"
                    danger
                    icon={
                      <Icon
                        icon={deleteIcon}
                        style={{ color: "#ff4d4f", marginRight: "6px" }}
                      />
                    }
                    onClick={this.deleteModel}
                  >
                    <span>Supprimer</span>
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Button
                className="btn-primary mr-3"
                icon={
                  <Icon
                    icon={caretDownFill}
                    style={{ color: "#fff", marginRight: "6px" }}
                  />
                }
              >
                Options
              </Button>
            </Dropdown>

            <Button
              className="btn"
              onClick={() => {
                history.goBack();
              }}
            >
              Retour
            </Button>
          </div>
        </div>
        <Spin
          spinning={this.state.saveModelLoading}
          tip="Enregistrement en cours..."
        >
          <Editor model={this.props.location.state} contentType={"html"} />
        </Spin>
      </>
    );
  }
}

EditDocument.propTypes = {
  folder: PropTypes.object.isRequired,
  dModel: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  getFolder: PropTypes.func.isRequired,
  getDModel: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  deleteDModel: PropTypes.func.isRequired,
  updateFolder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  folder: state.folder.folder,
  dModel: state.dModel.dModel,
  users: state.user.users,
  auth: state.auth.user,
});

// const mapDispatchToProps = dispatch => ({
//   loadUserData: () => dispatch(userActions.loadUserData()),
// });


export default withRouter(connect(mapStateToProps, {
  getFolder,
  getDModel,
  getUsers,
  createTask,
  deleteDModel,
  updateFolder,
  updateDModel,
})(EditDocument));
