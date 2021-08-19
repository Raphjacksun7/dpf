import React from 'react';
import {List, Typography, Switch, Button } from 'antd';
import {documents} from '../../data/document'
import "./styles.scss"

const { Title } = Typography;


const AssignedFolders = () => {


  function onChange(checked) {
    console.log(`switch to ${checked}`);
  //  setDisabled(!checked);
  }
  

  return (
    <>
      <Title level={4}> Dossier associés à  <span>Tom Cruise</span> </Title>
      <List
        size="small"
        dataSource={documents}
        renderItem={ document => {
          return(
            <>
              <List.Item style={{padding:" 20px 16px"}}>
                {document.document.name}
                <Button>Révoquer</Button>
              </List.Item>
            </>
          )
        }}
      />
      <div className="form">

      </div>
    </>
  )
}

export default AssignedFolders





