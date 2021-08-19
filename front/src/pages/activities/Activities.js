import React, { useState } from 'react'
import { Row, Col, Button,Typography, Modal, List, Avatar} from 'antd';
import { CalendarTwoTone} from '@ant-design/icons';
import documentImg from "../../assets/document.png"
import {AddActivity} from '../../components';
import "./styles.scss"

const { Title } = Typography;

const data = [
  {
    key: '1',
    activity: 'Creation de l’acte de vente pour la parcelle à Zogbo',
    folder: 'GBO_KAT_2005',
    hours: '15 heures',
    date: 'May 29, 2019',
  },
  {
    key: '2',
    activity: 'Creation de l’acte de vente pour la parcelle à Zogbo',
    folder: 'MAU_EUN_1053',
    hours: '08 heures',
    date: 'May 29, 2019',
  },
  {
    key: '3',
    activity: 'Creation de l’acte de vente pour la parcelle à Zogbo',
    folder: 'ACO_SON_8053',
    hours: '15 min',
    date: 'May 29, 2019',
  },
];

const Activities = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
     <Title level={2}>Compte rendu d’activités</Title>
     <Row className="add-new">
       <div className="to-right">
         <Button className="calendar-btn" icon={<CalendarTwoTone />}/>
         <Button className="d_btn_primary" type="primary" size="large" onClick={showModal}>
            Ajouter une activité
          </Button>
       </div>
        <Modal centered closable="false" visible={isModalVisible} width={600} onOk={handleOk} onCancel={handleCancel} okText="Valider" cancelText="Annuler">
          <AddActivity/>
        </Modal>
      </Row>
     <Row>
        <Col span={8}>
        <Title level={4}>Activités d’aujourd’hui</Title>
        </Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={documentImg} />}
              title={<a href="">{item.activity}</a>}
              description={item.folder}
            />
            <div className="extra-detail">{item.hours}</div>
          </List.Item>
        )}
      />

   </>
  )
}

export default Activities





