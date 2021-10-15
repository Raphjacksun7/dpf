import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Modal, Form, Alert, notification } from "antd";
import { BASE_URL, LOCAL_URL } from "../../constants";
import { create } from "../../actions/user";

import "./styles.scss";
import { selectColorStyles } from "../../config/colors";
import { getFolders, addToFolderUser } from "../../actions/folder";
import { accessAccount } from "../../actions/mailer";

const { Title } = Typography;

const AddUser = ({ visible, onCreate, onCancel }) => {
  const rule = {
    required: true,
    message: "Ce champ est obligatoire",
  };

  const folders = useSelector((state) => state.folder.folders);
  const authenticateUser = useSelector((state) => state.auth.user);
  const [errorMessage, setErrorMessage] = useState(null);

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFolders());
  }, []);

  const saveUser = (data) => {
    console.log(data, authenticateUser);
    setConfirmLoading(true);
    dispatch(
      create({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: "1234",
        role: data.role.value,
        assignedFolder: [data.folders.value],
      })
    )
      .then((response) => {
        console.log(response);
        dispatch(addToFolderUser(data.folders.value, [response._id])).then(
          () => {
            form.resetFields();
            notification.success({
              message: "L'utilisateur créer avec succès !",
              description: null,
              duration: 2,
            });
            setConfirmLoading(false);
            onCreate(response);
            dispatch(
              accessAccount({
                to: response.email,
                variables: {
                  confirmation_link: `${BASE_URL}create-password/${response._id}`,
                  user_full_name: response.firstname + " " + response.lastname,
                  admin_full_name:
                    authenticateUser.firstname +
                    " " +
                    authenticateUser.lastname,
                },
              })
            );
          }
        );
      })
      .catch((error) => {
        setErrorMessage("Une s'est survenu lors de l'ajout");
        console.log(error);
        setConfirmLoading(false);
      });
  };

  const roles = [
    { value: "ADMIN", label: "Admin" },
    { value: "GEST", label: "Gestionnaire" },
    { value: "FINA", label: "Financier" },
  ];

  return (
    <Modal
      visible={visible}
      okText="Valider"
      cancelText="Retour"
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            saveUser(values);
            // onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Title level={3}>Ajouter l' utilisateur</Title>
      {errorMessage ? <Alert description={errorMessage} type="error" /> : null}

      <Form form={form} name="form_in_modal" className="form">
        <div className="form-group">
          <label>Choisir un dossier de départ</label>
          <Form.Item
            name="folders"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select
              placeholder="Sélectionnez le dossier "
              className="basic-single"
              classNamePrefix="select"
              isClearable="true"
              isSearchable="ture"
              options={
                folders
                  ? folders.map((item) => {
                      return {
                        value: item._id,
                        label: `${item.name}`,
                      };
                    })
                  : []
              }
              styles={selectColorStyles}
            />
          </Form.Item>
        </div>
        <div className="form-group">
          <label>Nom de l'utilisateur</label>
          <Form.Item name="lastname" rules={[rule]}>
            <input
              size="large"
              placeholder="Entrer le nom de l'utilisateur"
              name="lastname"
            />
          </Form.Item>
        </div>
        <div className="form-group">
          <label>Prénom de l'utilisateur</label>
          <Form.Item name="firstname" rules={[rule]}>
            <input
              size="large"
              placeholder="Entrer le prénom de l'utilisateur"
              name="firstname"
            />
          </Form.Item>
        </div>
        <div className="form-group">
          <label>Entrez l'adresse e-mail de l'utilisateur </label>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Ce champ doit etre un email",
              },
              rule,
            ]}
          >
            <input
              size="large"
              placeholder="example@digitact.com"
              name="email"
            />
          </Form.Item>
        </div>
        <div className="form-group">
          <label>Choisir un role</label>
          <Form.Item name="role" rules={[rule]}>
            <Select
              placeholder="Sélectionnez le role"
              className="basic-single"
              classNamePrefix="select"
              isClearable="true"
              isSearchable="ture"
              name="init_folder"
              options={roles}
              styles={selectColorStyles}
            />
          </Form.Item>
        </div>
        <span className="text-hint">
          Vos collaborateurs recevront un e-mail qui leur permettra d’accéder à
          votre équipe.
        </span>
      </Form>
    </Modal>
  );
};

export default AddUser;
