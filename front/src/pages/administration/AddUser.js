import React from 'react';
import { Typography,Select, Input} from 'antd';
import "./styles.scss"

const { Option } = Select;

const { Title } = Typography;

const AddUser = () => {

  const onChange = (value) => {
    console.log(`selected ${value}`);
  }
  
  const onBlur = () =>  {
    console.log('blur');
  }
  
  const onFocus = () =>  {
    console.log('focus');
  }
  
  const onSearch = (val) =>{
    console.log('search:', val);
  }
  

  return (
    <>
      <Title level={2}>Ajout d'un nouvel utilisateur</Title>
      <div className="form">
        <div className="form-group">
          <label>Prénom</label>
          <Input size="large" placeholder="Entrer le Prénom"/>
        </div>
        <div className="form-group">
          <label>Nom</label>
          <Input size="large" placeholder="Entrer le Nom"/>
        </div>
        <div className="form-group">
          <label>Email</label>
          <Input type="email" size="large" placeholder="Entrer l'email"/>
        </div>
        <div className="form-group">
          <label>Role</label>
          <Select
            showSearch
            placeholder="Sélectionner un role"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="admin">Administrateur</Option>
            <Option value="finance">Financier</Option>
            <Option value="manager">Gestionnaire</Option>
          </Select>
        </div>
      </div>
    </>
  )
}

export default AddUser





