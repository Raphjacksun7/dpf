import React, { useState } from "react";
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

import "./styles.scss";

const { Title } = Typography;
const { Dragger } = Upload;

const AddClient = ({ visible, onCreate, onCancel }) => {
  const rule = {
    required: true,
    message: "Ce champ est obligatoire",
  };
  const [errorMessage, setErrorMessage] = useState(null);

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const saveUser = (data) => {
    const client = {
      firstname: data.firstname,
      lastname: data.lastname,
      idCardUrl: "",
      folders: [],
    };
    setConfirmLoading(true);
    dispatch(createClient(client))
      .then((data) => {
        console.log(data);
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
      .catch((error) => {
        setErrorMessage(error);
        console.log(error);
        setConfirmLoading(false);
      });
  };

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
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
              saveUser(values);
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
              <Dragger {...props}>
                <p className="ant-upload-text">
                  <Icon
                    icon={cloudUpload}
                    style={{ fontSize: "34px", marginRight: "10px" }}
                  />
                  Faites glisser le fichier ici ou <strong>parcourez</strong>
                </p>
              </Dragger>
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
