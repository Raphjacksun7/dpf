import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Upload, Typography, notification } from "antd";
import { useDispatch } from "react-redux";
import * as FileUploader from "../../services/file-uploader.service";
import { createDModel, getDModelsByFolder } from "../../actions/d-model";
import { Icon } from "@iconify/react";
import fileWord from "@iconify/icons-fa-solid/file-word";
import documentSync24Filled from "@iconify/icons-fluent/document-sync-24-filled";
import documentCheck from "@iconify/icons-mono-icons/document-check";
import "./styles.scss";

const Option = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  function uploadProof(file) {
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
              message: "Votre document justificatif a été ajouté avec succès !",
              description: null,
              duration: 3,
            });
            dispatch(getDModelsByFolder(id));
          })
          .catch((onSaveError) => {
            notification.error({
              message: "Une erreur !",
              description:
                "L'ajout du fichier a échoué, vérifiez votre connexion Internet et réessayez.",
              duration: 3,
            });
            console.log(onSaveError);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <Typography.Title
        level={3}
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "Poppins",
        }}
      >
        Nouveau document
      </Typography.Title>
      {/* <Row justify="space-around">
        <Upload
          showUploadList={false}
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          beforeUpload={(file) => {
            console.log(file);
            return history.push(`/editor/new/${id}`, { data: file });
          }}
        >
          <Button className="d_btn_cube">
            <Icon icon={fileWord} style={{ fontSize: "60px" }} />
            Documment existant
          </Button>
        </Upload>
        <Button
          className="d_btn_cube"
          onClick={() => history.push(`/generate-model/${id}`)}
        >
          <Icon icon={documentSync24Filled} style={{ fontSize: "70px" }} />
          Nouveau documment
        </Button>
      </Row> */}
      <div class="grid grid-cols-2 gap-6">
        {/* To upload the docx file into to editor */}
        <Upload
          className="upload"
          showUploadList={false}
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          beforeUpload={(file) => {
            console.log(file);
            return history.push(`/editor/new/${id}`, { data: file });
          }}
        >
          <div className="option-btn">
            <Icon icon={fileWord} />
            <span>Un modèle existant</span>
          </div>
        </Upload>

        {/* To upload any file into to folder as justificatif file*/}
        <Upload
          className="upload"
          showUploadList={false}
          accept="*"
          beforeUpload={(file) => {
            console.log(file);
            uploadProof(file);
          }}
        >
          <div className="option-btn">
            <Icon className="svg-small" icon={documentCheck} />
            <span>Un justificatif</span>
          </div>
        </Upload>

        {/* To see and select available template or modele of ACTES in the app */}
        <div
          className="option-btn"
          onClick={() => history.push(`/generate-model/${id}`)}
        >
          <Icon className="svg-small" icon={documentSync24Filled} />
          <span>Un modèle d'actes</span>
        </div>
      </div>
    </>
  );
};

export default Option;
