import React from 'react';
import {List, Typography, Switch, Button } from 'antd';
import {roles} from '../../data/roles'
import "./styles.scss"

const { Title } = Typography;


const UserRoles = () => {


  function onChange(checked) {
    console.log(`switch to ${checked}`);
  //  setDisabled(!checked);
  }
  

  return (
    <>
      <Title level={4}> Rôles de <span>Tom Cruise</span> sur les dossiers </Title>
      <List
        size="small"
        dataSource={roles}
        renderItem={ role => {
          return(
            <>
              <List.Item>
                {role.name}
                <Switch defaultChecked={true} onChange={onChange}/>
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

export default UserRoles





