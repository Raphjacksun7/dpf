import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import {
  Alert,
  Typography,
  Upload,
  Input,
  Form,
  Modal,
  notification,
} from "antd";
import { Icon } from "@iconify/react";
import axios from "axios";
import cloudUpload from "@iconify/icons-cil/cloud-upload";

import { createActe } from "../../actions/acte";
import { CLOUDINARY_NAME, UPLOAD_PRESET } from "../../constants";
import "./styles.scss";

const { Title } = Typography;

const UploadActe = ({ visible, onCreate, onCancel }) => {
  const rule = {
    required: true,
    message: "Ce champ est obligatoire",
  };

  const clientsOptions = [
    { value: "Acte de vente", label: "Acte de vente" },
    { value: "Donation", label: "Donation" },
    { value: "Déclaration de propriété", label: "Déclaration de propriété" },
    {
      value: "Attestation de recasement ",
      label: "Attestation de recasement ",
    },
    { value: "Titre foncier", label: "Titre foncier" },
  ];

  const [docFile, setDocFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [url, setUrl] = useState(null);
  const { id } = useParams();

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const uploadDocFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_NAME);
    try {
      axios
        .post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`, data)
        .then(async (data) => {
          console.log(data);
          setUrl(data.url);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProps = {
    showUploadList: false,
    accept: ".pdf",
    beforeUpload(file) {
      console.log(file);
      setDocFile(file);
    },
  };

  const saveActe = (data) => {
    let { name_acte, fileURI, acteType } = data;
    setConfirmLoading(true);
    const formData = new FormData();
    formData.append("file", fileURI.file.originFileObj);
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
            createActe({
              name: name_acte,
              acteType: acteType.value,
              fileURI: uploadRes.data.url,
              folder: id,
            })
          )
            .then((onSaveRes) => {
              form.resetFields();
              notification.success({
                message: "Votre acte a été ajouté avec succès !",
                description: null,
                duration: 3,
              });
              setConfirmLoading(false);
              onCreate(onSaveRes);
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
        centered
        visible={visible}
        okText="Valider"
        cancelText="Retour"
        onCancel={onCancel}
        confirmLoading={confirmLoading}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              saveActe(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Title level={2} style={{ textAlign: "center", fontWeight: "bold" }}>
          Ajouter un acte
        </Title>
        {errorMessage ? (
          <Alert description={errorMessage} type="error" />
        ) : null}

        <Form form={form} className="form">
          <div className="form-group">
            <label>Nom de l’acte </label>
            <Form.Item name="name_acte" rules={[rule]}>
              <Input placeholder="Saisissez le nom de l’acte" />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>Sélectionner le type d’acte</label>
            <Form.Item name="acteType" rules={[rule]}>
              <Select
                placeholder="Sélectionner le type d’acte"
                className="basic-single"
                classNamePrefix="select"
                isClearable="true"
                isSearchable="ture"
                name="service"
                options={clientsOptions}
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>Ajouter la pièce jointe </label>
            <Form.Item name="fileURI" rules={[rule]} valuePropName="fileURI">
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
              message="Assurez-vous que le fichier uploader soit signée"
              type="info"
              showIcon
            />
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UploadActe;
