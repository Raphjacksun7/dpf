import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Typography, Form, Alert, Modal, notification } from "antd";
import "./styles.scss";
import { getClients } from "../../actions/client";
import { getUsers } from "../../actions/user";
import { createFolder } from "../../actions/folder";
import { useDispatch, useSelector } from "react-redux";
import { selectColorStyles } from "../../config/colors";
import moment from "moment";

const { Title } = Typography;

const AddDocument = ({ visible, onCreate, onCancel }) => {
  const rule = {
    required: true,
    message: "Ce champ est obligatoire",
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();
  const users = useSelector((state) => state.user.users);
  const clients = useSelector((state) => state.client.clients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
    dispatch(getUsers());
  }, []);

  const dataOption = (options) => {
    const data = [];
    options.forEach((option) => {
      data.push({
        value: option._id,
        label: `${option.firstname} ${option.lastname}`,
      });
    });
    console.log(data);
    return data;
  };

  const serviceOptions = [
    { value: "Achat/Vente", label: "Achat/Vente" },
  ];

  const saveFolder = (data) => {
    const clients = data.clients.map((d) => {
      return d.value;
    });
    const users = data.users.map((d) => {
      return d.value;
    });

    const user = {
      name: "DOC_" + Math.floor(Math.random() * 4910) + 1595,
      service: data.service.value,
      status: "VERIFICATION",
      clients: clients,
      users: users,
    };

    setConfirmLoading(true);
    dispatch(createFolder(user))
      .then((data) => {
        form.resetFields();
        notification.success({
          message: "Dossier créer avec succès !",
          description: null,
          duration: 3,
        });
        setConfirmLoading(false);
        onCreate(data);
      })
      .catch((error) => {
        setErrorMessage(error);
        console.log(error);
        setConfirmLoading(false);
      });
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
              saveFolder(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Title level={3}>Création d'un nouveau dossier</Title>
        {errorMessage ? (
          <Alert description={errorMessage} type="error" />
        ) : null}

        <Form form={form} name="form_in_modal" className="form">
          <div className="form-group">
            <label>Sélectionnez le(s) client(s)</label>
            <Form.Item
              name="clients"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Select
                placeholder="Sélectionnez le(s) client(s)"
                className="basic-single"
                classNamePrefix="select"
                isMulti
                isClearable="true"
                isSearchable="ture"
                name="clients"
                options={dataOption(clients)}
                styles={selectColorStyles}
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <label>Selectionnez le type de service</label>
            <Form.Item name="service" rules={[rule]}>
              <Select
                placeholder="Selectionnez le type de service"
                className="basic-single"
                classNamePrefix="select"
                isClearable="true"
                isSearchable="ture"
                name="service"
                options={serviceOptions}
                styles={selectColorStyles}
              />
            </Form.Item>
          </div>

          <div className="form-group">
            <label>Ajouter le(s) collaborateur(s) </label>
            <Form.Item name="users" rules={[rule]}>
              <Select
                placeholder="Ajouter les collaborateurs par leurs noms"
                className="basic-single"
                classNamePrefix="select"
                isMulti
                isClearable="true"
                isSearchable="ture"
                name="users"
                options={dataOption(users)}
                styles={selectColorStyles}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddDocument;
