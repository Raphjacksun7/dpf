import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, PageHeader, Tag, notification, Spin } from "antd";
import { Editor } from "../../components";
import axios from "axios";
import { Icon } from "@iconify/react";
import roundSave from "@iconify/icons-ic/round-save";

import { getTask } from "../../actions/task";
import { getDModel } from "../../actions/d-model";
import { updateDModel } from "../../actions/d-model";
import { CLOUDINARY_NAME, UPLOAD_PRESET } from "../../constants";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const ViewDocument = ({ location }) => {
  const { id } = useParams();
  const [updating, setUpdating] = useState(false);
  const [modelData, setModelData] = useState();

  const task = useSelector((state) => state.task.task);
  const dModel = useSelector((state) => state.dModel.dModel);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getTask(id)).then(() => {
      dispatch(getDModel(task.ressourceId));
    });
  }, []);

  const updateModel = (blodFile) => {
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
  };

  return (
    <>
      <div className="editor-header">
        <PageHeader
          onBack={() => history.goBack()}
          title={dModel.name}
          tags={<Tag color="blue">{task.taskType}</Tag>}
          subTitle={moment(task.createdAt).fromNow()}
          extra={[
            <Button
              className="btn-primary mr-3"
              icon={
                <Icon
                  icon={roundSave}
                  style={{ color: "#fff", marginRight: "6px" }}
                />
              }
              onClick={() => {
                // updateModel(htmlDocx.asBlob("model"));
              }}
            >
              Envoyer vos modifications
            </Button>,
          ]}
        ></PageHeader>
      </div>

      <Spin
        spinning={updating}
        tip="Enregistrement des modifications en cours..."
      >
        <Editor model={modelData} contentType={"html"} />
      </Spin>
    </>
  );
};

export default ViewDocument;
