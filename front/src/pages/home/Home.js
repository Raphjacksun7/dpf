import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CContainer,
  CCol,
  CRow,
} from '@coreui/react'
import {
  Header,
  Footer,
} from '../../layouts'
import { Button, Modal } from 'antd';
import { Icon } from '@iconify/react';
import dashboardFilled from '@iconify/icons-ant-design/dashboard-filled';
import twotoneAdminPanelSettings from '@iconify/icons-ic/twotone-admin-panel-settings';
import statsDownAlt from '@iconify/icons-gridicons/stats-down-alt';
import reportAnalytics from '@iconify/icons-tabler/report-analytics';
import twotonePeopleOutline from '@iconify/icons-ic/twotone-people-outline';
import  "./styles.scss"
import AddDocument from '../../components/document/AddDocument';



const Dashboard = () => {

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
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <Header/>
        <div className="c-body dashboard">

        <CContainer>
          <CRow className="add-new">
            <Button className="d_btn_primary" type="primary" size="large" onClick={showModal}>
              Nouveau dossier
            </Button>
            <Modal centered closable="false" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Valider" cancelText="Retour">
              <AddDocument/>
            </Modal>
          </CRow>

          <CRow>
            <CCol xs="12" sm="6" lg="4">
            <Link to="/documents">
              <div className="card">
                <h3>Vue Global</h3>
                  <Icon icon={dashboardFilled} className="iconify"/>
              </div>
              </Link>
            </CCol>
            <CCol xs="12" sm="6" lg="4">
            <Link to="/my-document">
              <div className="card">
                <h3>Vos dossiers</h3>
                  <span>16</span>
              </div>
            </Link>
            </CCol>
            <CCol xs="12" sm="6" lg="4">
            <Link to="/customers">
              <div className="card">
                <h3>Clients</h3>
                  <Icon icon={twotonePeopleOutline} className="iconify"/>
              </div>
              </Link>
            </CCol>
            <CCol xs="12" sm="6" lg="4">
            <Link to="/administration">
              <div className="card">
                <h3>Administration</h3>
                  <Icon icon={twotoneAdminPanelSettings} className="iconify"/>
              </div>
              </Link>
            </CCol>
            <CCol xs="12" sm="6" lg="4">
            <Link to="/statistics">
              <div className="card">
                <h3>Statistiques</h3>
                  <Icon icon={statsDownAlt} className="iconify"/>
              </div>
              </Link>
            </CCol>
            <CCol xs="12" sm="6" lg="4">
            <Link to="/activities">
              <div className="card">
                <h3>Compte Rendu</h3>
                  <Icon icon={reportAnalytics} className="iconify"/>
              </div>
              </Link>
            </CCol>
          </CRow>
        </CContainer>
        </div>
        <Footer/>
      </div>
    </div>
   </>
  )
}

export default Dashboard
