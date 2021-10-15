import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Viewer, Worker } from "@react-pdf-viewer/core";
// Import the localization file
import fr_FR from "@react-pdf-viewer/locales/lib/fr_FR.json";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Button, Typography, Upload, Spin, notification } from "antd";

import { getFolder } from "../../actions/folder";
import { getActe, updateActe } from "../../actions/acte";
import { CLOUDINARY_NAME, UPLOAD_PRESET } from "../../constants";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./styles.scss";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewActe = ({ location }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { id } = useParams();
  const [replacing, setReplacing] = useState(false);
  const [newFile, setNewFile] = useState(false);

  const acte = useSelector((state) => state.acte.acte);
  const folder = useSelector((state) => state.folder.folder);
  const acteRef = useRef();
  acteRef.current = acteRef;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getActe(id)).then(() => getFolder(acteRef.current.folder));
  }, []);

  const replaceActe = (file) => {
    setReplacing(true);
    const formData = new FormData();
    formData.append("file", file);
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
            updateActe(acte._id, {
              ...acte,
              fileURI: uploadRes.data.url,
            })
          )
            .then(() => {
              notification.success({
                message: "Votre acte a été remplacé avec succès !",
                duration: 3,
              });
              setNewFile(uploadRes.data.url);
              setReplacing(false);
            })
            .catch(() => setReplacing(false));
        })
        .catch((uploadError) => {
          notification.error({
            message: "Une erreur !",
            description:
              "Le téléversement du fichier a échoué, verifier votre connexion internet et reéssayer",
            duration: 3,
          });
          console.log(uploadError);
          setReplacing(false);
        });
    } catch (error) {
      console.log(error);
      setReplacing(false);
    }
  };

  const props = {
    showUploadList: false,
    beforeUpload(file) {
      console.log(file);
      if (file.type !== "application/pdf") {
        return notification.error({
          message: "Fichier Invalide",
          description: `${file.name} n'est pas un PDF`,
        });
      } else return replaceActe(file);
    },
  };

  return (
    <>
      {console.log(location)}
      <Spin spinning={replacing}>
        <div className="editor-header flex justify-between">
          <div className="flex flex-wrap items-center">
            <Typography.Title level={4}>{folder.name}</Typography.Title>
            <Typography.Title level={5} className="block w-full">
              <span>{acte.name}</span>
            </Typography.Title>
          </div>

          <div className="flex flex-wrap items-center">
            <Upload {...props}>
              <Button className="btn-primary mr-3">Remplacer</Button>
            </Upload>

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

        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.js">
          <div
            style={{
              height: "700px",
              width: "100%",
              marginTop: "50px",
            }}
          >
            {newFile ? (
              <Viewer
                theme="auto"
                fileUrl={newFile}
                plugins={[defaultLayoutPluginInstance]}
                localization={fr_FR}
              />
            ) : (
              <Viewer
                theme="auto"
                fileUrl={location.state.data}
                plugins={[defaultLayoutPluginInstance]}
                localization={fr_FR}
              />
            )}
          </div>
        </Worker>
      </Spin>
    </>
  );
};

export default ViewActe;
