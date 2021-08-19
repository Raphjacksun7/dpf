import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "axios";
import PropTypes from "prop-types";
import { notification, Button, Form, Modal, Typography, Spin } from "antd";
import { Icon } from "@iconify/react";
import roundSave from "@iconify/icons-ic/round-save";
import { Editor } from "../../components";

import { getFolder } from "../../actions/folder";
import { createDModel } from "../../actions/d-model";
import { history } from "../../helpers/history";
import { CLOUDINARY_NAME, UPLOAD_PRESET } from "../../constants";
import "./styles/document.scss";
import { withRouter } from "react-router";

class ViewDocument extends React.Component {
  constructor() {
    super();
    this.saveModel = this.saveModel.bind(this);

    this.idFolder = history.location.pathname.split("/")[3];
    this.state = {
      model: "",
      saveModal: false,
      saveModelLoading: false,
      isUserClicked: false,
      errorMessage: null,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.props.getFolder(this.idFolder);
  }

  saveModel(blodFile, data) {
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
              .createDModel({
                name: data.modeleName,
                modelType: data.modeleType.value,
                fileURI: uploadRes.data.url,
                folder: this.props.folder._id,
              })
              .then((onSaveRes) => {
                notification.success({
                  message: "Votre modèle a été ajouté avec succès !",
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

  render() {
    const { folder } = this.props;
    return (
      <>
        <div className="editor-header flex justify-between">
          <div className="flex flex-wrap items-center">
            <Typography.Title level={4}>{folder.name}</Typography.Title>
            <Typography.Title level={5} className="block w-full">
              <span>{this.props.location.state.data.name}</span>
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
                this.setState({ saveModal: true });
              }}
            >
              Enregistrer
            </Button>
            <Modal
              className="save-modal"
              okText="Terminer"
              cancelText="Retour"
              visible={this.state.saveModal}
              onCancel={(e) => {
                e.stopPropagation();
                this.setState({ saveModal: false });
              }}
              onOk={() => {
                this.formRef.current
                  .validateFields()
                  .then((formValues) => {
                    const html =
                      '<!DOCTYPE html><html><head lang="fr">' +
                      '<meta charset="UTF-8"><title></title></head><body>' +
                      document.getElementsByClassName("fr-element")[0]
                        .innerHTML +
                      "</body></html>";
                    console.log(formValues);
                    this.saveModel(new Blob([html]), formValues);
                    // var blob = new Blob([html], {
                    //   type: "text/plain;charset=utf-8",
                    // });
                    // saveAs(blob, "static.html");
                    // saveAs(htmlDocx.asBlob(html), "output.docx");
                  })
                  .catch((info) => {
                    console.log("Validate Failed:", info);
                  });
              }}
            >
              <Typography.Title level={3}>Plus qu'une étape</Typography.Title>
              <Form
                ref={this.formRef}
                name="control-ref"
                className="form"
                initialValues={null}
              >
                <div className="form-group">
                  <label>Saisissez le nom de votre modèle</label>
                  <Form.Item
                    name="modeleName"
                    rules={[
                      {
                        required: true,
                        message: "Ce champ est obligatoire",
                      },
                    ]}
                  >
                    <input
                      size="large"
                      placeholder="EX: ACTE DE CONVENTION HOUSSOU"
                      name="modeleName"
                    />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <label>Quelle type de modèle avez vous ? </label>
                  <Form.Item
                    name="modeleType"
                    rules={[
                      {
                        required: true,
                        message: "Ce champ est obligatoire",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Selectionner une reponse"
                      isClearable="true"
                      name="modeleType"
                      options={[
                        { value: "ACTE", label: "Un Acte" },
                        { value: "LETTER", label: "Une Lettre" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Form>
            </Modal>

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
          <Editor model={this.props.location.state} contentType={"docx"} />
        </Spin>
      </>
    );
  }
}

ViewDocument.propTypes = {
  folder: PropTypes.object.isRequired,
  createDModel: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  folder: state.folder.folder,
});

export default withRouter(connect(mapStateToProps, {
  getFolder,
  createDModel,
})(ViewDocument));
