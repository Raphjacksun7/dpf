import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, PageHeader, Tag, notification, Spin } from "antd";
import { Editor } from "../../components";
import axios from "axios";
import { Icon } from "@iconify/react";
import roundSave from "@iconify/icons-ic/round-save";

import { getTask, updateTask } from "../../actions/task";
import { getDModel } from "../../actions/d-model";
import { updateDModel } from "../../actions/d-model";
import { CLOUDINARY_NAME, UPLOAD_PRESET } from "../../constants";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const ViewDocument = ({ location }) => {
  const { id } = useParams();
  const [updating, setUpdating] = useState(false);

  const task = useSelector((state) => state.task.task);
  const dModel = useSelector((state) => state.dModel.dModel);
  const taskRef = useRef();
  taskRef.current = task;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log(location);
    dispatch(getTask(id)).then(() => {
      dispatch(getDModel(taskRef.current.ressourceId));
    });
  }, []);

  const updateModel = (blodFile) => {
    var reader = new FileReader();
    reader.readAsDataURL(blodFile);
    reader.onloadend = function () {
      const base64data = reader.result;
      setUpdating(true);
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
            dispatch(
              updateDModel(dModel._id, {
                ...dModel,
                fileURI: uploadRes.data.url,
              })
            )
              .then(() => {
                dispatch(
                  updateTask(task._id, {
                    ...task,
                    status: "FAIRE",
                  })
                )
                  .then(() => {
                    notification.success({
                      message: "Vos modifications ont été enregistrer !",
                      description: null,
                      duration: 3,
                    });
                    setUpdating(false);
                  })
                  .catch(() => setUpdating(false));
              })
              .catch((onSaveError) => {
                notification.error({
                  message: "Une erreur !",
                  description:
                    "L'enregistrement des modifications a échoué, vérifiez votre connexion Internet et réessayez.",
                  duration: 3,
                });
                console.log(onSaveError);
                setUpdating(false);
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
            setUpdating(false);
          });
      } catch (error) {
        console.log(error);
      }
    };
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
                const html =
                  '<!DOCTYPE html><html><head lang="fr">' +
                  '<meta charset="UTF-8"><title></title></head><body>' +
                  document.getElementsByClassName("fr-element")[0].innerHTML +
                  "</body></html>";
                updateModel(new Blob([html]));
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
        <Editor model={location.state} contentType={"html"} />
      </Spin>
    </>
  );
};

export default ViewDocument;
