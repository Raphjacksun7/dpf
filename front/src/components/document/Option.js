import React, { useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { Upload, Typography, Button, Modal, Row, message } from "antd";
import { Icon } from "@iconify/react";
import fileWord from "@iconify/icons-fa-solid/file-word";
import documentSync24Filled from "@iconify/icons-fluent/document-sync-24-filled";
import GenerateModel from "./GenerateModel";
import "./styles.scss";

const { Title } = Typography;

const Option = () => {
  const history = useHistory();
  const { id } = useParams();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Title level={3} style={{ textAlign: "center", fontWeight: "bold" }}>
        Générer un modele
      </Title>
      <Row justify="space-around">
        <Upload
          showUploadList={false}
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          beforeUpload={(file) => {
            console.log(file);
            return (
              history.push(`/editor/new/${id}`,{ data: file })
            );
          }}
        >
          <Button className="d_btn_cube">
            <Icon icon={fileWord} style={{ fontSize: "60px" }} />
            Modèle existant
          </Button>
        </Upload>
        <Button className="d_btn_cube" onClick={()=> history.push(`/generate-model/${id}`)}>
          <Icon icon={documentSync24Filled} style={{ fontSize: "70px" }} />
          Nouveau modèle
        </Button>
        <Modal
          className="hideFooter"
          centered
          visible={isModalVisible}
          width={700}
          onCancel={handleCancel}
        >
          <GenerateModel />
        </Modal>
      </Row>
    </>
  );
};

export default Option;
