import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Modal,
  Form,
  Alert,
  Upload,
  Input,
  message,
  notification,
} from "antd";
import { Icon } from "@iconify/react";
import cloudUpload from "@iconify/icons-cil/cloud-upload";
import { useDispatch } from "react-redux";
import { createClient } from "../../actions/client";
import { CLOUDINARY_NAME, UPLOAD_PRESET } from "../../constants";
import "./styles.scss";

const { Title } = Typography;
const { Dragger } = Upload;

const AddClient = ({ visible, onCreate, onCancel }) => {
  const rule = {
    required: true,
    message: "Ce champ est obligatoire",
  };
  const [errorMessage, setErrorMessage] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const uploadProps = {
    showUploadList: false,
    accept: "*",
    beforeUpload(file) {
      console.log(file);
      setDocFile(file);
    },
  };

  const saveClient = (data) => {
    let { idCard } = data;
    setConfirmLoading(true);
    const formData = new FormData();
    formData.append("file", idCard.file.originFileObj);
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
            createClient({
              firstname: data.firstname,
              lastname: data.lastname,
              associatedDocuments: [
                {
                  id: uploadRes.data.public_id,
                  name: uploadRes.data.original_filename,
                  url: uploadRes.data.url,
                  format: uploadRes.data.format,
                },
              ],
              folders: [],
            })
          )
            .then(() => {
              form.resetFields();
              notification.success({
                message: "Le client à été ajoute avec succès !",
                description: null,
                duration: 2,
              });
              setConfirmLoading(false);
              setErrorMessage(null);
              onCreate(data);
            })
            .catch((onSaveError) => {
              setErrorMessage(onSaveError);
              console.log(onSaveError);
              setConfirmLoading(false);
            });
        })
        .catch((uploadError) => {
          setErrorMessage(
            "L'upload du fichier a echoué, verifier votre connexion internet et reéssayer"
          );
          console.log(uploadError);
          setConfirmLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        okText="Valider"
        cancelText="Retour"
        closable="false"
        onCancel={onCancel}
        confirmLoading={confirmLoading}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              saveClient(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Title level={3}>Ajouter un client</Title>
        {errorMessage ? (
          <Alert description={errorMessage} type="error" />
        ) : null}
        <Form form={form} name="form_in_modal" className="form">
          <div className="form-group">
            <label>Nom</label>
            <Form.Item name="lastname" rules={[rule]}>
              <Input size="large" placeholder="Entrer le nom du client" />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>Prénom</label>
            <Form.Item name="firstname" rules={[rule]}>
              <Input size="large" placeholder="Entrer le prénom du client" />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>Ajoutez la pièce d'identité </label>
            <Form.Item
              name="idCard"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Upload.Dragger
                {...uploadProps}
                style={
                  docFile
                    ? { borderColor: "#00b94a", background: "#ecfffe" }
                    : null
                }
              >
                {docFile ? (
                  <p
                    className="ant-upload-text"
                    style={{
                      fontSize: "13px",
                      display: "contents",
                      whiteSpace: "break-spaces",
                    }}
                  >
                    <Icon
                      icon={cloudUpload}
                      style={{ fontSize: "34px", marginRight: "10px" }}
                    />
                    {docFile.name}
                  </p>
                ) : (
                  <p className="ant-upload-text">
                    <Icon
                      icon={cloudUpload}
                      style={{ fontSize: "34px", marginRight: "10px" }}
                    />
                    Faites glisser le fichier ici ou <strong>parcourez</strong>
                  </p>
                )}
              </Upload.Dragger>
            </Form.Item>
          </div>
          <div className="form-group">
            <Alert
              message="Assurez-vous que le fichier uploader soit une photo d'identité"
              type="info"
              showIcon
            />
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddClient;
